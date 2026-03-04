from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
import numpy as np

from app.models import QueryRequest, QueryResponse, Citation
from app.config import engine

from core.generator import GroundedGenerator
from core.verifier import AnswerVerifier
from core.scorer import ConfidenceScorer
from core.hybrid import HybridRetriever

router = APIRouter()
generator = GroundedGenerator()


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        os.makedirs("data", exist_ok=True)
        file_path = os.path.join("data", file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        chunks = engine.ingestor.ingest_document(file_path)
        embeddings = engine.embedder.encode(chunks)

        engine.retriever.build_index(embeddings, chunks)
        engine.is_index_built = True

        return {
            "message": "Document indexed successfully",
            "chunks_indexed": len(chunks)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/query", response_model=QueryResponse)
async def query_system(request: QueryRequest):

    if not engine.is_index_built:
        raise HTTPException(
            status_code=400,
            detail="Index not built yet. Upload document first."
        )

    # -------------------------------
    # STEP 1: Dense Retrieval (FAISS)
    # -------------------------------
    query_embedding = engine.embedder.encode([request.question])
    dense_results = engine.retriever.search(query_embedding, top_k=5)

    if not dense_results:
        raise HTTPException(status_code=400, detail="No relevant documents found.")

    # -------------------------------
    # STEP 2: Keyword Retrieval (BM25)
    # -------------------------------
    hybrid_engine = HybridRetriever(engine.retriever.documents)
    keyword_results = hybrid_engine.keyword_search(request.question, top_k=5)

    # -------------------------------
    # STEP 3: Hybrid Score Fusion
    # -------------------------------
    combined_scores = {}

    # Add dense scores
    for doc, score in dense_results:
        combined_scores[doc] = combined_scores.get(doc, 0) + score

    # Add scaled BM25 scores
    for doc, score in keyword_results:
        combined_scores[doc] = combined_scores.get(doc, 0) + (score * 0.01)

    # Sort combined results
    hybrid_results = sorted(
        combined_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )[:5]

    # -------------------------------
    # STEP 4: Reranking (Cosine)
    # -------------------------------
    query_vec = query_embedding[0]

    reranked = []
    for doc, _ in hybrid_results:
        doc_vec = engine.embedder.encode([doc])[0]
        cosine_sim = np.dot(query_vec, doc_vec) / (
            np.linalg.norm(query_vec) * np.linalg.norm(doc_vec)
        )
        reranked.append((doc, float(cosine_sim)))

    reranked.sort(key=lambda x: x[1], reverse=True)
    results = reranked[:3]

    contexts = [doc for doc, score in results]
    retrieval_scores = [score for doc, score in results]

    # -------------------------------
    # STEP 5: Generation
    # -------------------------------
    answer = generator.generate_answer(request.question, contexts)

    # -------------------------------
    # STEP 6: Sentence Verification
    # -------------------------------
    verifier = AnswerVerifier()
    support_ratio = verifier.verify(answer, contexts)
    detailed_support = verifier.verify_detailed(answer, contexts)

    # -------------------------------
    # STEP 7: Base Confidence
    # -------------------------------
    scorer = ConfidenceScorer()
    confidence = scorer.score(retrieval_scores, support_ratio)

    avg_retrieval = sum(retrieval_scores) / len(retrieval_scores)

    # Weak retrieval penalty
    if avg_retrieval < 0.25:
        confidence *= 0.5

    # Insufficient info override
    if "Insufficient information" in answer:
        confidence = 0.1

    # -------------------------------
    # STEP 8: Contradiction Detection
    # -------------------------------
    contradiction_detected = False

    if len(contexts) >= 2:
        doc_vecs = engine.embedder.encode(contexts)
        sim = np.dot(doc_vecs[0], doc_vecs[1]) / (
            np.linalg.norm(doc_vecs[0]) * np.linalg.norm(doc_vecs[1])
        )

        if sim < 0.1:
            contradiction_detected = True
            confidence *= 0.7

    # -------------------------------
    # STEP 9: Final Confidence Level
    # -------------------------------
    confidence = max(0.0, min(confidence, 1.0))

    if confidence >= 0.75:
        level = "HIGH"
    elif confidence >= 0.45:
        level = "MEDIUM"
    else:
        level = "LOW"

    # -------------------------------
    # STEP 10: Citations
    # -------------------------------
    citations = []
    for idx, (doc, score) in enumerate(results):
        citations.append(
            Citation(
                document="uploaded_doc",
                chunk_id=idx
            )
        )

    return QueryResponse(
        answer=answer,
        citations=citations,
        confidence_score=confidence,
        confidence_level=level,
        reason=f"Support ratio: {support_ratio:.2f}, Avg retrieval: {avg_retrieval:.2f}",
        contradictions_detected=contradiction_detected,
        claim_support=detailed_support
    )