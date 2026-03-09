# Faithful-RAG-System

🚀 A functional trust-aware Retrieval-Augmented Generation system with claim-level verification and confidence scoring.

## Domain
Natural Language Processing, Generative AI, Information Retrieval

---

## Overview
This project focuses on improving the factual reliability of Large Language Model outputs using a Retrieval-Augmented Generation (RAG) framework. The system grounds generated responses in external evidence and evaluates faithfulness between answers and retrieved documents.

The current implementation provides a functional trust-aware RAG prototype with claim-level verification and confidence scoring.

---

## Problem Statement
Large Language Models often hallucinate factual information due to their reliance on parametric memory. Although Retrieval-Augmented Generation (RAG) improves grounding by incorporating external knowledge sources, generated responses may still lack faithfulness and proper evidence alignment.

This project designs and implements a RAG-based system that enhances factual grounding and reduces hallucinations through evidence-aware generation and verification.

---

## Objectives
- Reduce hallucinated content in generated responses
- Improve factual grounding using retrieved evidence
- Evaluate answer–evidence consistency using faithfulness metrics
- Provide transparent confidence scoring for generated outputs

---

## System Pipeline
Query → Retriever → Generator → Verifier → Confidence Scoring → Final Answer

---

## System Architecture (Implemented)

User Query  
→ FastAPI Backend  
→ Document Chunking & Embedding  
→ FAISS Semantic Retrieval  
→ Hybrid Reranking (Cosine Similarity)  
→ Grounded Answer Generation  
→ Claim-Level Verification  
→ Confidence Scoring Module  
→ Structured JSON Response  
→ React Dashboard UI  

---

## Tech Stack

### Backend
- Python 3.10+
- FastAPI (REST API)
- FAISS (Dense Vector Search)
- Sentence Transformers (Text Embeddings)
- NumPy (Vector Operations)

### Frontend
- React (Vite)
- TailwindCSS
- Axios (API Communication)

## Live Demo

Frontend:
https://faithful-rag-system.vercel.app

### Verification & Trust Layer
- Cosine similarity–based claim validation
- Support ratio computation
- Confidence scoring algorithm
- Basic contradiction detection logic

---

## Implementation Progress (March 2026)

The project has transitioned from conceptual design to a functional working prototype.

### Implemented Modules
- Document upload and ingestion
- Automatic document chunking
- Semantic embedding generation
- FAISS-based top-k retrieval
- Hybrid reranking using cosine similarity
- Grounded answer generation
- Sentence-level claim support verification
- Confidence scoring mechanism
- Basic contradiction detection
- React-based dashboard for interaction

The system produces structured responses containing:
- Generated Answer
- Citations (source chunk references)
- Confidence Score
- Confidence Level (LOW / MEDIUM / HIGH)
- Claim-Level Support Breakdown

---

## API Endpoints

### POST /upload
Uploads and indexes a knowledge document for retrieval.

### POST /query
Accepts a user question and returns:
- Generated answer
- Supporting citations
- Confidence score
- Confidence level
- Claim-level support analysis

---

## Engineering Improvements
- Modular backend structure
- Clear separation of retrieval, generation, and verification layers
- Structured API responses
- Frontend-backend integration
- Improved repository organization

---

## Future Enhancements
- Authentication and authorization layer
- Rate limiting and security hardening
- Persistent database integration
- Advanced NLI-based contradiction detection
- Automated evaluation metrics and benchmarking

---

## Team
- **Priya Kumari** (Team Leader)
- **Aanya Tyagi**
