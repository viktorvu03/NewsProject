"use client";
import React, { useEffect, useState } from "react";
import { APIPost } from "@/services/APIPost";
import APIUser from "@/services/APIUser";
import { APIEvaluations } from "@/services/APIEvaluation";
import { clearAuth } from "@/Utils/MangerLocalStorage";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [postCount, setPostCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadCounts() {
      setLoading(true);
      try {
        const [postsRes, usersRes, commentsRes] = await Promise.all([
          APIPost.getAllPost(),
          APIUser.getAllUser(),
          APIEvaluations.getAllEvaluataion(),
        ]);

        const posts = Array.isArray(postsRes) ? postsRes : postsRes?.data ?? [];
        const users = Array.isArray(usersRes) ? usersRes : usersRes?.data ?? [];
        const comments = Array.isArray(commentsRes)
          ? commentsRes
          : commentsRes?.data ?? [];

        setPostCount(Array.isArray(posts) ? posts.length : 0);
        setUserCount(Array.isArray(users) ? users.length : 0);
        setCommentCount(Array.isArray(comments) ? comments.length : 0);
      } catch (err) {
        console.error("load counts failed", err);
        setPostCount(0);
        setUserCount(0);
        setCommentCount(0);
      } finally {
        setLoading(false);
      }
    }
    loadCounts();
  }, []);

  // function handleSignOut() {
  //   clearAuth();
  //   // navigate to home
  //   router.push("/");
  // }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {/* <div>
          <button
            onClick={handleSignOut}
            className="rounded bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm"
          >
            Sign out
          </button>
        </div> */}
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Bài viết</div>
          <div className="mt-2 text-2xl font-bold text-blue-700">
            {loading ? "..." : postCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Tổng số bài đang đăng
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Người dùng</div>
          <div className="mt-2 text-2xl font-bold text-blue-700">
            {loading ? "..." : userCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Người dùng đã đăng ký
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Bình luận</div>
          <div className="mt-2 text-2xl font-bold text-blue-700">
            {loading ? "..." : commentCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Bình luận từ người dùng
          </div>
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
