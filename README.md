# Faithful-RAG-System

## Domain
Natural Language Processing, Generative AI, Information Retrieval

## Overview
This project focuses on improving the factual reliability of Large Language Model outputs using a Retrieval-Augmented Generation (RAG) framework. The system grounds generated responses in external evidence and evaluates faithfulness between answers and retrieved documents.

## Problem Statement
Large Language Models often hallucinate factual information due to their reliance on parametric memory. Although Retrieval-Augmented Generation (RAG) improves grounding by incorporating external knowledge sources, generated responses may still lack faithfulness and proper evidence alignment.

This project aims to design and evaluate a RAG-based system that enhances factual grounding and reduces hallucinations through evidence-aware generation and verification.

## Objectives
- Reduce hallucinated content in generated responses  
- Improve factual grounding using retrieved evidence  
- Evaluate answer–evidence consistency using faithfulness metrics  

## System Pipeline
Query → Retriever → Generator → Verifier → Final Answer

## Tech Stack (Tentative)
- Python  
- Hugging Face Transformers  
- Dense Retrieval (FAISS / Similarity Search)  
- Pre-trained Language Models  
- Similarity / NLI-based Verification  

## Team
- **Priya Kumari** (Team Leader)  
- **Aanya Tyagi**

## Project Status
Phase 0: Repository setup and problem definition (Completed)
