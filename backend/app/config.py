from typing import Optional
from core.embedding import EmbeddingModel
from core.retriever import VectorRetriever
from core.ingestion import DocumentIngestor


class EngineState:
    def __init__(self):
        self.ingestor = DocumentIngestor()
        self._embedder = None
        self.retriever = VectorRetriever()
        self.is_index_built = False

    @property
    def embedder(self):
        if self._embedder is None:
            self._embedder = EmbeddingModel()
        return self._embedder


engine = EngineState()