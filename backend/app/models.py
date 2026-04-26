from pydantic import BaseModel
from typing import List

from typing import Optional

class ClaimSupport(BaseModel):
    sentence: str
    supported: bool
    similarity: float

class QueryRequest(BaseModel):
    question: str

class Citation(BaseModel):
    document: str
    chunk_id: int

class QueryResponse(BaseModel):
    answer: str
    citations: List[Citation]
    confidence_score: float
    confidence_level: str
    reason: str
    contradictions_detected: bool
    claim_support: Optional[List[ClaimSupport]] = None
    consistency_score: float
    consistency_level: str