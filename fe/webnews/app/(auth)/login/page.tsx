"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Đăng nhập thất bại");
      }

      router.push("/admin");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Có lỗi xảy ra";
      setError(message);
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full -translate-y-1/3 max-w-md bg-white rounded-lg shadow px-8 py-10">
          <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>

          {error && (
            <div className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="********"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center rounded bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-orange-600 hover:underline">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
