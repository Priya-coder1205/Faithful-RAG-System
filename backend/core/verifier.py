"""
Verification Engine

Responsibilities:
- Split generated answer into individual claims (sentences)
- Compute semantic similarity between each claim and retrieved context
- Determine if claim is supported
- Return support ratio (0 to 1)
"""

import re
from typing import List
import numpy as np
from sentence_transformers import SentenceTransformer


class AnswerVerifier:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2") -> None:
        self.model = SentenceTransformer(model_name)

    def _split_sentences(self, answer: str) -> List[str]:
        if not answer or not answer.strip():
            return []
        return [part.strip() for part in re.split(r"(?<=[.!?])\s+", answer.strip()) if part.strip()]

    def verify(self, answer: str, contexts: List[str]) -> float:
        sentences = self._split_sentences(answer)
        if not sentences:
            return 0.0
        if not contexts:
            return 0.0

        sentence_embeddings = np.asarray(self.model.encode(sentences, convert_to_numpy=True), dtype=np.float32)
        context_embeddings = np.asarray(self.model.encode(contexts, convert_to_numpy=True), dtype=np.float32)

        sentence_norms = np.linalg.norm(sentence_embeddings, axis=1, keepdims=True)
        context_norms = np.linalg.norm(context_embeddings, axis=1, keepdims=True)
        sentence_norms = np.maximum(sentence_norms, 1e-12)
        context_norms = np.maximum(context_norms, 1e-12)

        normalized_sentences = sentence_embeddings / sentence_norms
        normalized_contexts = context_embeddings / context_norms

        similarity_matrix = np.matmul(normalized_sentences, normalized_contexts.T)
        max_similarities = np.max(similarity_matrix, axis=1)
        supported_sentences = int(np.sum(max_similarities > 0.5))

        support_ratio = supported_sentences / len(sentences)
        return float(support_ratio)

    def verify_detailed(self, answer: str, contexts: List[str]) -> List[dict]:
        """
        Returns detailed claim-level verification.

        Output format:
        [
            {
                "sentence": "...",
                "supported": True/False,
                "similarity": 0.82
            }
        ]
        """

        if not answer or not answer.strip():
            return []

        # Split into sentences
        sentences = self._split_sentences(answer)

        if not sentences:
            return []

        sentence_embeddings = np.asarray(self.model.encode(sentences, convert_to_numpy=True), dtype=np.float32)
        context_embeddings = np.asarray(self.model.encode(contexts, convert_to_numpy=True), dtype=np.float32)

        results = []

        # Precompute norms for contexts
        context_norms = np.linalg.norm(context_embeddings, axis=1)
        context_norms = np.maximum(context_norms, 1e-12)

        for idx, sentence_vec in enumerate(sentence_embeddings):
            sentence_norm = np.linalg.norm(sentence_vec)
            sentence_norm = max(sentence_norm, 1e-12)

            similarities = []

            for j, context_vec in enumerate(context_embeddings):
                sim = float(np.dot(sentence_vec, context_vec) / (sentence_norm * context_norms[j]))
                similarities.append(sim)

            max_similarity = max(similarities) if similarities else 0.0
            supported = max_similarity > 0.5

            results.append({
                "sentence": sentences[idx],
                "supported": supported,
                "similarity": float(max_similarity)
            })

        return results
