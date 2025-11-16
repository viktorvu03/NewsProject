"use client";
import React, { useState } from "react";

type Post = { id: string; title: string; excerpt?: string };

const initialPosts: Post[] = [
  {
    id: "1",
    title: "Người mua hàng tin vào người nổi tiếng",
    excerpt: "Người mua hàng tin vào người nổi tiếng hơn tem kiểm định",
  },
  {
    id: "2",
    title: "Vỡ mộng với giấc mơ du lịch",
    excerpt: "Nữ du khách vỡ mộng khi sống như dân du mục số",
  },
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [editing, setEditing] = useState<Post | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");

  function openNew() {
    setEditing(null);
    setTitle("");
    setExcerpt("");
    setModalOpen(true);
  }

  function openEdit(p: Post) {
    setEditing(p);
    setTitle(p.title);
    setExcerpt(p.excerpt || "");
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("Xác nhận xóa bài viết này?")) return;
    setPosts((s) => s.filter((x) => x.id !== id));
  }

  function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim()) return alert("Tiêu đề bắt buộc");

    if (editing) {
      setPosts((s) =>
        s.map((p) => (p.id === editing.id ? { ...p, title, excerpt } : p))
      );
    } else {
      const newPost: Post = { id: String(Date.now()), title, excerpt };
      setPosts((s) => [newPost, ...s]);
    }

    setModalOpen(false);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Quản lý Bài viết
        </h2>
        <button
          onClick={openNew}
          className="rounded bg-blue-600 text-white px-3 py-2 shadow"
        >
          Tạo mới
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex items-start justify-between rounded bg-white p-4 shadow"
          >
            <div>
              <div className="font-semibold text-slate-800">{p.title}</div>
              <div className="text-sm text-slate-500 mt-1">{p.excerpt}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(p)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg rounded bg-white p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium mb-3">
              {editing ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
            </h3>
            <label className="block mb-2">
              <span className="text-sm text-slate-600">Tiêu đề</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-sm text-slate-600">Tóm tắt</span>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                rows={4}
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded border px-3 py-2"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded bg-blue-600 px-3 py-2 text-white"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
