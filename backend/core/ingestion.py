"""
Document Ingestion Service

Responsibilities:
- Read TXT and PDF files
- Extract raw text
- Use TextChunker to split into chunks
- Return list of chunks
"""

import os
from typing import List

from PyPDF2 import PdfReader

from core.chunking import TextChunker


class DocumentIngestor:
	def __init__(self, chunk_size: int = 500, overlap: int = 100):
		self.chunker = TextChunker(chunk_size=chunk_size, overlap=overlap)

	def read_text_file(self, file_path: str) -> str:
		"""
		Read a UTF-8 encoded text file and return its content.
		"""
		try:
			with open(file_path, "r", encoding="utf-8") as file:
				return file.read()
		except FileNotFoundError as exc:
			raise FileNotFoundError(f"File not found: {file_path}") from exc
		except UnicodeDecodeError as exc:
			raise ValueError(f"Text file is not valid UTF-8: {file_path}") from exc
		except OSError as exc:
			raise OSError(f"Unable to read text file: {file_path}") from exc

	def read_pdf_file(self, file_path: str) -> str:
		"""
		Read a PDF file and extract text from all pages.
		"""
		try:
			reader = PdfReader(file_path)
			pages_text = [page.extract_text() or "" for page in reader.pages]
			return "\n".join(pages_text)
		except FileNotFoundError as exc:
			raise FileNotFoundError(f"File not found: {file_path}") from exc
		except Exception as exc:
			raise ValueError(f"Unable to extract text from PDF: {file_path}") from exc

	def ingest_document(self, file_path: str) -> List[str]:
		"""
		Ingest TXT or PDF document and return list of text chunks.
		"""
		if not file_path:
			raise ValueError("file_path is required")

		extension = os.path.splitext(file_path)[1].lower()

		if extension == ".txt":
			text = self.read_text_file(file_path)
		elif extension == ".pdf":
			text = self.read_pdf_file(file_path)
		else:
			raise ValueError(f"Unsupported file type: {extension}")

		return self.chunker.chunk_text(text)
