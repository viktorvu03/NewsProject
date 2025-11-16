"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/admin";

  const linkClass = (path: string) =>
    `rounded px-3 py-2 ${
      pathname === path ? "bg-white/10 font-semibold" : "hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen flex bg-blue-50 text-slate-800">
      <aside className="w-64 bg-linear-to-b from-blue-700 to-blue-600 text-white p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">WebNews Admin</h2>
          <p className="text-sm text-blue-100/80 mt-1">
            Quản lý nội dung & người dùng
          </p>
        </div>

        <nav className="mt-6 flex flex-col gap-2">
          <Link href="/admin" className={linkClass("/admin")}>
            Dashboard
          </Link>
          <Link href="/admin/posts" className={linkClass("/admin/posts")}>
            Quản lý bài viết
          </Link>
          <Link href="/admin/users" className={linkClass("/admin/users")}>
            Quản lý người dùng
          </Link>
          <Link
            href="/"
            className="mt-4 inline-block rounded bg-white/10 px-3 py-2 text-sm"
          >
            Xem site
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Hệ thống quản trị — thống kê và thao tác nhanh
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Sign out
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
