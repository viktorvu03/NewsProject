"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import APIUser from "@/services/APIUser";
import { UserRegisReuest } from "@/types/User";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null && "message" in err) {
    const maybe = (err as { message?: unknown }).message;
    if (typeof maybe === "string") return maybe;
  }
  return "Có lỗi xảy ra";
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Vui lòng nhập đủ email và mật khẩu.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải dài ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);
    try {
      const now = new Date().toISOString();
      const payload: UserRegisReuest = {
        id: 0,
        fullName: name || "",
        userName: email.split("@")[0] || email || "user",
        email: email,
        password: password,
        role: "user",
        status: "active",
        createTime: now,
        updateTime: now,
      };

      const result = await APIUser.register(payload);

      if (!result || result.code !== "00") {
        throw new Error(result?.error || "Đăng ký thất bại");
      }

      setSuccess("Đăng ký thành công. Chuyển đến trang đăng nhập...");
      setTimeout(() => router.push("/login"), 800);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md -translate-y-1/4 bg-white rounded-lg shadow px-8 py-10">
          <h1 className="text-2xl font-semibold mb-4">Đăng ký</h1>

          {error && (
            <div className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded bg-green-50 border border-green-200 text-green-700 px-3 py-2 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-600">Họ và tên</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Nguyễn Văn A"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Mật khẩu</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ít nhất 6 ký tự"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Xác nhận mật khẩu</span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Nhập lại mật khẩu"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center rounded bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              href="/(login)/lgoin"
              className="text-orange-600 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
