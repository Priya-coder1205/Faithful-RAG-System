import { useMemo, useState } from "react";
import axios from "axios";
import UploadCard from "../components/UploadCard";
import QueryCard from "../components/QueryCard";
import AnswerCard from "../components/AnswerCard";
import SidebarLayout from "../components/SidebarLayout";

const API_BASE = "http://127.0.0.1:8000";

function normalizeConfidence(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  if (value <= 1) return Math.round(value * 100);
  return Math.max(0, Math.min(100, Math.round(value)));
}

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [question, setQuestion] = useState("");
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState("");
  const [queryResult, setQueryResult] = useState(null);

  const [citationsExpanded, setCitationsExpanded] = useState(false);

  const safeResult = useMemo(() => {
    if (!queryResult) return null;
    return {
      answer: queryResult.answer || "",
      citations: Array.isArray(queryResult.citations) ? queryResult.citations : [],
      confidence_score: normalizeConfidence(queryResult.confidence_score),
      confidence_level: queryResult.confidence_level || "UNKNOWN",
      reason: queryResult.reason || "",
      contradictions_detected: Boolean(queryResult.contradictions_detected),
      claim_support: Array.isArray(queryResult.claim_support)
        ? queryResult.claim_support
        : [],
    };
  }, [queryResult]);

  const handleFileSelect = (file) => {
    setSelectedFile(file || null);
    setUploadSuccess("");
    setUploadError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file before uploading.");
      return;
    }

    setUploadLoading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadSuccess(`Uploaded: ${selectedFile.name}`);

      try {
        const current = Number(localStorage.getItem("tkis_docs_indexed") || "0");
        localStorage.setItem("tkis_docs_indexed", String(current + 1));
      } catch {
        // localStorage unavailable
      }
    } catch (error) {
      setUploadError(
        error?.response?.data?.detail || error?.message || "Upload failed. Please try again."
      );
    } finally {
      setUploadLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      setQueryError("Please enter a question.");
      return;
    }

    setQueryLoading(true);
    setQueryError("");
    setCitationsExpanded(false);

    try {
      const askedQuestion = question.trim();
      const { data } = await axios.post(`${API_BASE}/query`, {
        question: askedQuestion,
      });

      setQueryResult(data);

      try {
        const existing = JSON.parse(localStorage.getItem("tkis_query_history") || "[]");
        const next = [
          {
            question: askedQuestion,
            confidence_score: normalizeConfidence(data?.confidence_score),
            confidence_level: data?.confidence_level || "UNKNOWN",
            timestamp: new Date().toISOString(),
          },
          ...existing,
        ].slice(0, 50);
        localStorage.setItem("tkis_query_history", JSON.stringify(next));
      } catch {
        // localStorage unavailable
      }
    } catch (error) {
      setQueryError(
        error?.response?.data?.detail || error?.message || "Failed to fetch answer."
      );
      setQueryResult(null);
    } finally {
      setQueryLoading(false);
    }
  };

  return (
    <SidebarLayout
      title="AI Knowledge Dashboard"
      subtitle="Upload sources, ask questions, and inspect confidence with evidence-backed outputs."
    >
      <div className="grid grid-cols-1 gap-7 xl:grid-cols-12">
        <div className="space-y-7 xl:col-span-4">
          <UploadCard
            selectedFile={selectedFile}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            uploadLoading={uploadLoading}
            uploadSuccess={uploadSuccess}
            uploadError={uploadError}
            onFileSelect={handleFileSelect}
            onUpload={handleUpload}
          />

          <QueryCard
            question={question}
            setQuestion={setQuestion}
            queryLoading={queryLoading}
            queryError={queryError}
            onAsk={handleAsk}
          />
        </div>

        <div className="xl:col-span-8">
          <AnswerCard
            result={safeResult}
            citationsExpanded={citationsExpanded}
            onToggleCitations={() => setCitationsExpanded((prev) => !prev)}
          />
        </div>
      </div>
    </SidebarLayout>
  );
}