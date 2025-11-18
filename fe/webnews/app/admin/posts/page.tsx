"use client";
import React, { useEffect, useState } from "react";
import { APIPost } from "@/services/APIPost";
import { APICategories } from "@/services/APICategories";
import { CategoryResponse } from "@/types/Categories";
import { Post } from "@/types/Post";
import Image from "next/image";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [programName, setProgramName] = useState("");
  const [depcription, setDepcription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [categoryId, setCategoryId] = useState<number | string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await APIPost.getAllPost();
      if (Array.isArray(data)) setPosts(data as Post[]);
      else setPosts([]);
    } catch (err) {
      console.error("load posts failed", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
    (async function loadCats() {
      try {
        const data = await APICategories.getAllCategories();
        if (Array.isArray(data)) setCategories(data as CategoryResponse[]);
      } catch (err) {
        console.error("load categories failed", err);
        setCategories([]);
      }
    })();
  }, []);

  function openNew() {
    setEditing(null);
    setProgramName("");
    setDepcription("");
    setImgUrl("");
    setCategoryId(undefined);
    setModalOpen(true);
  }

  function openEdit(p: Post) {
    setEditing(p);
    setProgramName(p.programName || "");
    setDepcription(p.depcription || "");
    setImgUrl(p.img || "");
    setCategoryId(p.categoryId ?? undefined);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Xác nhận xóa bài viết này?")) return;
    try {
      await APIPost.deletePost(id);
      await loadPosts();
    } catch (err) {
      console.error("delete failed", err);
      alert("Xóa thất bại");
    }
  }

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!programName.trim()) return alert("Tiêu đề bắt buộc");

    if (!categoryId) return alert("Vui lòng chọn chuyên mục");

    const now = new Date().toISOString();
    const payload: Post = {
      id: editing ? editing.id : 0,
      programName: programName,
      depcription: depcription,
      img: imgUrl,
      categoryId: Number(categoryId),
      createTime: editing ? editing.createTime : now,
      updateTime: now,
    } as Post;
    try {
      let result: { code?: string; error?: string } | null = null;
      if (editing) {
        result = await APIPost.updatePost(payload);
      } else {
        result = await APIPost.creatPost(payload);
      }

      if (result && result.code === "00") {
        await loadPosts();
        setModalOpen(false);
        alert("Lưu bài viết thành công");
      } else {
        const msg = result?.error || "Lưu bài viết thất bại";
        alert(msg);
      }
    } catch (err) {
      console.error("save post failed", err);
      alert("Lưu bài viết thất bại");
    }
  }
  //
  async function handleFileChange(file?: File | null) {
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = String(reader.result || "");
        // send base64 to API that saves to public/assets/uploads
        const res = await fetch("/api/uploadImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, data: dataUrl }),
        });
        const json = await res.json();
        if (res.ok && json?.url) {
          setImgUrl(json.url);
        } else {
          console.error("upload failed", json);
          alert("Upload ảnh thất bại");
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("handleFileChange error", err);
      alert("Không thể đọc file");
    }
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

      {loading && <div className="text-sm text-gray-600 mb-3">Đang tải...</div>}

      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex items-start justify-between rounded bg-white p-4 shadow"
          >
            <div className="flex gap-4">
              <Image
                src={p.img || "/assets/placeholder.png"}
                alt={p.programName}
                width={500}
                height={500}
                className="h-16 w-24 object-cover rounded"
              />
              <div>
                <div className="font-semibold text-slate-800">
                  {p.programName}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {p.depcription}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(p)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(Number(p.id))}
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
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
              />
            </label>
            <label className="block mb-2">
              <span className="text-sm text-slate-600">Tóm tắt</span>
              <textarea
                value={depcription}
                onChange={(e) => setDepcription(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                rows={4}
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm text-slate-600">Ảnh</span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] ?? null)
                  }
                />
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    width={500}
                    height={500}
                    alt="preview"
                    className="h-16 w-24 object-cover rounded"
                  />
                )}
              </div>
            </label>

            <label className="block mb-4">
              <span className="text-sm text-slate-600">Chuyên mục</span>
              <select
                value={categoryId ?? ""}
                onChange={(e) =>
                  setCategoryId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="mt-1 w-full rounded border px-3 py-2"
              >
                <option value="">-- Chọn chuyên mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
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
                className="rounded bg-blue-600 text-white px-3 py-2"
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
