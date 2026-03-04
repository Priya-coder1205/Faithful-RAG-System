"""
Embedding Service

Responsibilities:
- Load SentenceTransformer model
- Encode list of text chunks
- Return numpy embeddings
- Keep model loaded once (singleton style)
- Optimize for inference speed
"""

from threading import Lock
from typing import Dict, List

import numpy as np
from sentence_transformers import SentenceTransformer


class EmbeddingModel:
	_models: Dict[str, SentenceTransformer] = {}
	_lock = Lock()

	def __init__(self, model_name: str = "all-MiniLM-L6-v2", batch_size: int = 32):
		self.model_name = model_name
		self.batch_size = batch_size
		self.model = self._get_or_load_model(model_name)

	@classmethod
	def _get_or_load_model(cls, model_name: str) -> SentenceTransformer:
		if model_name in cls._models:
			return cls._models[model_name]

		with cls._lock:
			if model_name not in cls._models:
				cls._models[model_name] = SentenceTransformer(model_name)
			return cls._models[model_name]

	def encode(self, texts: List[str]) -> np.ndarray:
		"""
		Encode input texts into dense vector embeddings.
		"""
		if not texts:
			return np.empty((0, 0), dtype=np.float32)

		embeddings = self.model.encode(
			texts,
			convert_to_numpy=True,
			show_progress_bar=False,
			batch_size=self.batch_size,
		)
		return np.asarray(embeddings, dtype=np.float32)
