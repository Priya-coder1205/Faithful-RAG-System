# Problem Statement

Large Language Models (LLMs) often generate factually incorrect or hallucinated information due to their reliance on parametric memory. While Retrieval-Augmented Generation (RAG) improves factual grounding by incorporating external knowledge sources, generated responses may still lack faithfulness and proper alignment with retrieved evidence.

This project aims to design and evaluate a RAG-based system that enhances factual grounding through evidence-aware retrieval and post-generation faithfulness verification. The system focuses on reducing hallucinations and improving answer–evidence consistency using existing evaluation metrics.

## Objectives
- Reduce hallucinated content in generated responses
- Improve factual grounding using retrieved documents
- Evaluate faithfulness using answer–evidence alignment metrics

## Proposed Pipeline
Query → Retriever → Generator → Verifier → Final Answer
