"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { APIPost } from "@/services/APIPost";
import { Post as PostType } from "@/types/Post";
import { formatDate } from "@/Utils/formatDate";

export default function CategoryTabs({
  localArticles = [],
  categories,
  paramName = "categoryId",
}: {
  localArticles?: PostType[];

  categories?: { id: string; label: string }[];
  paramName?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams?.get(paramName) ?? "";

  const [active, setActive] = useState<string>("");
  const [allPosts, setAllPosts] = useState<PostType[]>(
    localArticles as PostType[]
  );
  const [posts, setPosts] = useState<PostType[]>(localArticles as PostType[]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setActive(param);
  }, [param]);

  useEffect(() => {
    let cancelled = false;
    async function loadAll() {
      setLoading(true);
      try {
        const data: PostType[] = await APIPost.getAllPost();
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setAllPosts(data as PostType[]);
        } else {
          setAllPosts(localArticles as PostType[]);
        }
      } catch (err) {
        console.error("APIPost.getAllPost failed:", err);
        if (!cancelled) setAllPosts(localArticles);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [localArticles]);

  useEffect(() => {
    if (!active) {
      setPosts(allPosts);
      return;
    }
    const filtered = allPosts.filter(
      (p) => String(p.categoryId) === String(active)
    );
    setPosts(filtered);
  }, [active, allPosts]);

  // reset to first page whenever filter/posts change
  useEffect(() => {
    setPage(1);
  }, [active, allPosts.length]);

  function onSelect(id: string) {
    setActive(id);
    const url = new URL(window.location.href);
    if (!id) url.searchParams.delete(paramName);
    else url.searchParams.set(paramName, id);
    router.push(url.pathname + url.search);
  }
  const fallbackImg =
    "https://hiepkiem.inplay.vn/_next/image?url=%2Fassets%2Fimages%2Fbanner-main%2Fbackground-banner-main.jpg&w=1200&q=75";
  const isValidHttpUrl = (value?: string) => {
    if (!value) return false;
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {categories?.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              active === c.id
                ? "bg-blue-600 text-white"
                : "bg-white/80 text-gray-800 hover:bg-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading && <div className="text-sm text-gray-500">Đang tải...</div>}
        {!loading && posts.length === 0 && (
          <div className="text-sm text-gray-500">Không có bài viết.</div>
        )}
        {!loading && posts.length > 0 && (
          <>
            {posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((p) => {
              const imgSrc = isValidHttpUrl(p.img as string)
                ? (p.img as string)
                : fallbackImg;
              if (!isValidHttpUrl(p.img as string)) {
                console.warn(
                  "CategoryTabs: invalid image src, using fallback:",
                  p.img,
                  "for post",
                  p.id
                );
              }

              return (
                <Link
                  key={p.id}
                  href={`/news/${p.id}`}
                  className="flex gap-4 rounded border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <img
                    src={imgSrc}
                    alt={p.programName}
                    height={200}
                    width={200}
                    className="h-28 w-40 flex-none rounded object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-pink-500" />
                        <time className="text-sm text-gray-500">
                          {formatDate(p.createTime, { relative: true })}
                        </time>
                      </div>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:underline">
                      {p.programName}
                    </h3>
                    <p className="mt-2 text-sm line-clamp-1 max-h-10  text-gray-600 flex-1">
                      {p.depcription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
      {/* pagination controls */}
      {!loading && posts.length > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Hiển thị {Math.min((page - 1) * PAGE_SIZE + 1, posts.length)} -{" "}
            {Math.min(page * PAGE_SIZE, posts.length)} / {posts.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-orange-50 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(posts.length / PAGE_SIZE) }).map(
              (_, idx) => {
                const pNum = idx + 1;
                return (
                  <button
                    key={pNum}
                    onClick={() => setPage(pNum)}
                    className={`px-3 py-1 rounded ${
                      pNum === page
                        ? "bg-orange-600 text-white"
                        : "border text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {pNum}
                  </button>
                );
              }
            )}
            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(Math.ceil(posts.length / PAGE_SIZE), p + 1)
                )
              }
              disabled={page >= Math.ceil(posts.length / PAGE_SIZE)}
              className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-orange-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
