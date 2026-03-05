# System Architecture

## Overview
The Faithful-RAG-System follows a modular architecture that separates the retrieval, generation, verification, and presentation layers. This design ensures scalability, maintainability, and clarity in system responsibilities.

## Architecture Flow

User Query  
↓  
Frontend (React Dashboard)  
↓  
FastAPI Backend API  
↓  
Document Ingestion & Chunking  
↓  
Embedding Generation (Sentence Transformers)  
↓  
Vector Retrieval (FAISS Index)  
↓  
Answer Generation Module  
↓  
Claim-Level Verification  
↓  
Confidence Scoring  
↓  
Structured Response (Answer + Citations + Confidence)

## Components

### Frontend
- Built with React and Vite
- Provides user interface for document upload and question answering
- Displays generated answers, citations, and confidence metrics

### Backend
- Implemented using FastAPI
- Handles API endpoints for document ingestion and query processing
- Coordinates retrieval, generation, and verification modules

### Retrieval Layer
- Uses FAISS vector indexing for efficient semantic search
- Retrieves top-k relevant document chunks for a given query

### Verification Layer
- Performs claim-level verification between generated answers and retrieved evidence
- Computes semantic similarity scores for supporting evidence

### Confidence Scoring
- Combines retrieval similarity and claim support ratio
- Produces a confidence score and classification (LOW / MEDIUM / HIGH)

## Design Principles
- Modular pipeline architecture
- Separation of concerns
- Explainable answer verification
- Transparent confidence estimation
