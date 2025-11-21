"use client";
import React, { useEffect, useState } from "react";
import { UserRegisReuest } from "@/types/User";
import APIUser from "@/services/APIUser";

type UserItem = {
  id: number | string;
  fullName?: string;
  userName?: string;
  email?: string;
  role?: string; // '00' or '01'
  status?: string;
  createTime?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("00");
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await APIUser.getAllUser();
      if (Array.isArray(data)) setUsers(data as UserItem[]);
      else if (data && Array.isArray(data.data))
        setUsers(data.data as UserItem[]);
      else setUsers([]);
    } catch (err) {
      console.error("laod người dùng failure", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openNew() {
    setEditing(null);
    setFullName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setRole("00");
    setModalOpen(true);
  }

  function openEdit(u: UserItem) {
    setEditing(u);
    setFullName(u.fullName || "");
    setUserName(u.userName || "");
    setEmail(u.email || "");
    setPassword("");
    setRole(u.role || "00");
    setModalOpen(true);
  }

  async function handleDelete(id: number | string) {
    if (!confirm("Xác nhận xóa người dùng này?")) return;
    try {
      await APIUser.delete(Number(id));
      await loadUsers();
    } catch (err) {
      console.error("delete user failed", err);
      alert("Xóa người dùng thất bại");
    }
  }

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!fullName.trim() || !userName.trim() || !email.trim())
      return alert("Vui lòng nhập đầy đủ họ tên, tên đăng nhập và email");

    const payload: UserRegisReuest = {
      id: editing && typeof editing.id === "number" ? editing.id : 0,
      fullName,
      userName,
      email,
      password: password || "",
      role: role,
      status: "00",
      createTime: editing?.createTime ?? new Date().toISOString(),
      updateTime: new Date().toISOString(),
    } as UserRegisReuest;

    try {
      if (editing) {
        const res = await APIUser.updateUser(payload);
        if (res && (res.code === "00" || res.Code === "00" || res.success)) {
          await loadUsers();
          setModalOpen(false);
          alert("Cập nhật người dùng thành công");
        } else {
          alert(res?.error || res?.message || "Cập nhật thất bại");
        }
      } else {
        const res = await APIUser.createUser(payload);
        if (res && (res.code === "00" || res.Code === "00" || res.success)) {
          await loadUsers();
          setModalOpen(false);
          alert("Tạo người dùng thành công");
        } else {
          alert(res?.error || res?.message || "Tạo người dùng thất bại");
        }
      }
    } catch (err) {
      console.error("save user failed", err);
      alert("Lưu người dùng thất bại");
    }
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

      {loading && <div className="text-sm text-gray-600 mb-3">Đang tải...</div>}

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={String(u.id)}
            className="flex items-center justify-between rounded bg-white p-4 shadow"
          >
            <div>
              <div className="font-semibold text-slate-800">
                {u.fullName || u.userName}
              </div>
              <div className="text-sm text-slate-500 mt-1">{u.email}</div>
              <div className="text-xs text-slate-500 mt-1">
                Role: {u.role === "01" ? "Admin" : "User"}
              </div>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm text-slate-600">Tên đăng nhập</span>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm text-slate-600">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                required
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm text-slate-600">
                Mật khẩu{editing ? " (Để trống nếu không đổi)" : ""}
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                type="password"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm text-slate-600">Quyền</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              >
                <option value="00">Người dùng</option>
                <option value="01">Admin </option>
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
