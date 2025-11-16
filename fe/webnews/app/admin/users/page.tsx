"use client";
import React, { useState } from "react";

type User = { id: string; name: string; email: string };

const initialUsers: User[] = [
  { id: "1", name: "Nguyễn Văn A", email: "a@example.com" },
  { id: "2", name: "Trần Thị B", email: "b@example.com" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editing, setEditing] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function openNew() {
    setEditing(null);
    setName("");
    setEmail("");
    setModalOpen(true);
  }

  function openEdit(u: User) {
    setEditing(u);
    setName(u.name);
    setEmail(u.email);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("Xác nhận xóa người dùng này?")) return;
    setUsers((s) => s.filter((x) => x.id !== id));
  }

  function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name.trim() || !email.trim()) return alert("Nhập đủ thông tin");

    if (editing) {
      setUsers((s) =>
        s.map((u) => (u.id === editing.id ? { ...u, name, email } : u))
      );
    } else {
      const newUser: User = { id: String(Date.now()), name, email };
      setUsers((s) => [newUser, ...s]);
    }

    setModalOpen(false);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Quản lý Người dùng
        </h2>
        <button
          onClick={openNew}
          className="rounded bg-blue-600 text-white px-3 py-2 shadow"
        >
          Tạo mới
        </button>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow"
          >
            <div>
              <div className="font-semibold text-slate-800">{u.name}</div>
              <div className="text-sm text-slate-500 mt-1">{u.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(u)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u.id)}
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
              {editing ? "Chỉnh sửa người dùng" : "Tạo người dùng"}
            </h3>
            <label className="block mb-2">
              <span className="text-sm text-slate-600">Họ tên</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-sm text-slate-600">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
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
