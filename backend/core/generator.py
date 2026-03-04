import os
from typing import List
from openai import OpenAI


class GroundedGenerator:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("OPENROUTER_API_KEY"),
            base_url="https://openrouter.ai/api/v1",
        )

    def generate_answer(self, question: str, contexts: List[str]) -> str:
        context_text = "\n\n".join(contexts)

        system_prompt = (
            "You are a strict AI assistant. "
            "You must answer ONLY using the provided context. "
            "If the answer is not present in the context, reply: "
            "'Insufficient information in provided documents.' "
            "Do not use outside knowledge."
        )

        user_prompt = f"""
        Context:
        {context_text}

        Question:
        {question}
        """

        response = self.client.chat.completions.create(
            model="openrouter/auto",  # Free model on OpenRouter
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content.strip()