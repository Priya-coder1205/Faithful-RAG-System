"""
Text Chunking Service

Responsibilities:
- Split text into overlapping chunks
- Maintain context continuity
- Remove empty chunks
- Parameterized chunk size and overlap
"""

from typing import List


class TextChunker:
	def __init__(self, chunk_size: int = 500, overlap: int = 100):
		if chunk_size <= 0:
			raise ValueError("chunk_size must be greater than 0")
		if overlap < 0:
			raise ValueError("overlap must be non-negative")

		self.chunk_size = chunk_size
		self.overlap = min(overlap, chunk_size - 1)

	@property
	def step_size(self) -> int:
		return self.chunk_size - self.overlap

	def chunk_text(self, text: str) -> List[str]:
		"""
		Split text into overlapping character-based chunks.
		"""
		if not text:
			return []

		chunks: List[str] = []
		for start in range(0, len(text), self.step_size):
			chunk = text[start : start + self.chunk_size]
			if chunk and chunk.strip():
				chunks.append(chunk)

		return chunks
