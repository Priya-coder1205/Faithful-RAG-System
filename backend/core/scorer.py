"""
Confidence Scoring Engine

Responsibilities:
- Combine retrieval score
- Combine support ratio
- Penalize contradictions
- Produce final confidence score
"""

from typing import List


class ConfidenceScorer:
	def __init__(self, contradiction_penalty: float = 0.2) -> None:
		self.contradiction_penalty = self._clamp_01(contradiction_penalty)

	def _clamp_01(self, value: float) -> float:
		return max(0.0, min(1.0, float(value)))

	def _average_retrieval(self, retrieval_scores: List[float]) -> float:
		scores = [self._clamp_01(score) for score in retrieval_scores]
		if not scores:
			return 0.0
		return sum(scores) / len(scores)

	def score(self, retrieval_scores: List[float], support_ratio: float, contradictions_detected: bool = False) -> float:
		retrieval_strength = self._average_retrieval(retrieval_scores)
		confidence = (0.4 * retrieval_strength) + (0.6 * self._clamp_01(support_ratio))
		if contradictions_detected:
			confidence -= self.contradiction_penalty
		return self._clamp_01(confidence)
