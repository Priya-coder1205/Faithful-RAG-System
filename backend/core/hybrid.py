"""
Hybrid Retrieval Engine

Combines:
- FAISS dense retrieval
- BM25 keyword retrieval
"""

from rank_bm25 import BM25Okapi
from typing import List, Tuple
import numpy as np


class HybridRetriever:
    def __init__(self, documents: List[str]):
        self.documents = documents
        tokenized_docs = [doc.split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized_docs)

    def keyword_search(self, query: str, top_k: int = 3) -> List[Tuple[str, float]]:
        tokenized_query = query.split()
        scores = self.bm25.get_scores(tokenized_query)
        ranked_indices = np.argsort(scores)[::-1][:top_k]

        results = []
        for idx in ranked_indices:
            results.append((self.documents[idx], float(scores[idx])))
        return results