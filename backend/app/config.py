from typing import Optional
from core.embedding import EmbeddingModel
from core.retriever import VectorRetriever
from core.ingestion import DocumentIngestor


class EngineState:
    def __init__(self):
        self.ingestor = DocumentIngestor()
        self.embedder = EmbeddingModel()
        self.retriever = VectorRetriever()
        self.is_index_built = False


engine = EngineState()