"use client";
import React, { useEffect, useState } from "react";
import { APIEvaluations } from "@/services/APIEvaluation";
import {
  createEvaluationRequest,
  getEvaluataionResponse,
} from "@/types/Evaluation";
import { getAuth } from "@/Utils/MangerLocalStorage";

export default function EvaluationSection({
  postId,
}: {
  postId?: number | string;
}) {
  const [items, setItems] = useState<getEvaluataionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await APIEvaluations.getAllEvaluataion();
      if (Array.isArray(data)) setItems(data as getEvaluataionResponse[]);
      else setItems([]);
    } catch (err) {
      console.error("load evaluations failed", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const auth = getAuth();
      const userName = auth?.user?.userName || auth?.user?.fullName || "Khách";
      const now = new Date().toISOString();
      const payload: createEvaluationRequest = {
        id: 0,
        userName: String(userName),
        rating: Number(rating),
        depcription: text || "",
        createTime: now,
        updateTime: now,
      };

      const res = await APIEvaluations.createEvaluation(payload);
      if (!res || res.code !== "00") {
        throw new Error(res?.error || "Gửi đánh giá thất bại");
      }

      setText("");
      setRating(5);
      // reload evaluations
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Ý kiến bình luận</h3>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <label className="text-sm">Đánh giá:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} sao
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Bình luận</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full mt-1 border rounded px-2 py-1"
            rows={3}
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-orange-500 text-white px-3 py-1 rounded"
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
      </form>

      <div>
        {loading ? (
          <div className="text-sm text-gray-600">Đang tải đánh giá...</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-gray-600">Chưa có đánh giá.</div>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="border rounded p-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{it.userName}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(it.createTime).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-yellow-600">
                  {"★".repeat(it.rating) + "☆".repeat(5 - it.rating)}
                </div>
                <p className="mt-2 text-sm text-gray-700">{it.depcription}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
