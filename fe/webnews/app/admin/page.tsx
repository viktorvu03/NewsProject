"use client";
import React from "react";

export default function AdminPage() {
  return (
    <section>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Bài viết</div>
          <div className="mt-2 text-2xl font-bold text-blue-700">{12}</div>
          <div className="mt-1 text-xs text-slate-400">
            Tổng số bài đang đăng
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Người dùng</div>
          <div className="mt-2 text-2xl font-bold text-blue-700">{34}</div>
          <div className="mt-1 text-xs text-slate-400">
            Người dùng đã đăng ký
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Hoạt động</div>
          <div className="mt-2 text-2xl font-bold text-blue-700">{5}</div>
          <div className="mt-1 text-xs text-slate-400">Đang chờ xử lý</div>
        </div>
      </section>

      <section className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Bảng điều khiển</h2>
        <p className="mt-2 text-sm text-slate-600">
          Truy cập nhanh các chức năng quản lý bên trái.
        </p>
      </section>
    </section>
  );
}
