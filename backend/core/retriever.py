"""
Vector Retriever Service

Responsibilities:
- Build FAISS index from embeddings
- Store associated document chunks
- Perform similarity search
- Return top-k results with similarity scores
"""

from typing import List, Tuple

import faiss
import numpy as np


class VectorRetriever:
	def __init__(self) -> None:
		self.index: faiss.IndexFlatL2 | None = None
		self.documents: List[str] = []

	def build_index(self, embeddings: np.ndarray, documents: List[str]) -> None:
		"""
		Build FAISS index from embedding vectors and store source documents.
		"""
		vectors = np.asarray(embeddings, dtype=np.float32)

		if vectors.ndim != 2:
			raise ValueError("embeddings must be a 2D array")
		if len(documents) != vectors.shape[0]:
			raise ValueError("documents count must match number of embedding rows")

		dimension = vectors.shape[1]
		self.index = faiss.IndexFlatL2(dimension)
		self.index.add(vectors)
		self.documents = list(documents)

	def search(self, query_embedding: np.ndarray, top_k: int = 5) -> List[Tuple[str, float]]:
		"""
		Search for top-k similar documents using L2 distance.
		"""
		if self.index is None:
			raise ValueError("index is not built; call build_index first")
		if top_k <= 0:
			return []

		query = np.asarray(query_embedding, dtype=np.float32)
		if query.ndim == 1:
			query = query.reshape(1, -1)
		elif query.ndim != 2 or query.shape[0] != 1:
			raise ValueError("query_embedding must be a 1D vector or shape (1, dim)")

		k = min(top_k, len(self.documents))
		if k == 0:
			return []

		distances, indices = self.index.search(query, k)

		results: List[Tuple[str, float]] = []
		for distance, index in zip(distances[0], indices[0]):
			if index < 0 or index >= len(self.documents):
				continue
			similarity_score = 1.0 / (1.0 + float(distance))
			results.append((self.documents[index], similarity_score))

		return results
