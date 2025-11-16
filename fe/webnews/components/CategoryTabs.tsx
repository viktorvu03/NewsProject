"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  time: string;
  image: string;
};

const CATEGORIES = [
  { key: "all", label: "Tất cả" },
  { key: "chinh-tri", label: "Chính trị" },
  { key: "kinh-te", label: "Kinh tế" },
  { key: "cong-nghe", label: "Công nghệ" },
  { key: "the-thao", label: "Thể thao" },
];

function mapArticleToCategory(a: Article) {
  // Deterministic mapping for mock data: distribute by id
  const idx = a.id % (CATEGORIES.length - 1); // exclude 'all'
  return CATEGORIES[idx + 1].key;
}

export default function CategoryTabs({
  localArticles = [],
  categories,
  paramName = "categoryId",
}: {
  localArticles?: Article[];
  /**
   * categories will be fetched by the header in the future.
   * Each category should have an `id` (string) and `label`.
   */
  categories?: { id: string; label: string }[];
  /** query param name to read/write selected category id */
  paramName?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams?.get(paramName) ?? "";

  const [active, setActive] = useState<string>(param);
  const [posts, setPosts] = useState<Article[]>(localArticles);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActive(param);
  }, [param]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const q = active ? `?${paramName}=${encodeURIComponent(active)}` : "";
        const res = await fetch(`/api/posts${q}`, { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data)) setPosts(data);
          else if (!cancelled) setPosts(localArticles);
        } else if (!cancelled) {
          setPosts(localArticles);
        }
      } catch (err) {
        if (!cancelled) setPosts(localArticles);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [active, localArticles, paramName]);

  function onSelect(id: string) {
    setActive(id);
    const url = new URL(window.location.href);
    if (!id) url.searchParams.delete(paramName);
    else url.searchParams.set(paramName, id);
    router.push(url.pathname + url.search);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSelect("")}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            active === ""
              ? "bg-blue-600 text-white"
              : "bg-white/80 text-gray-800 hover:bg-white"
          }`}
        >
          Tất cả
        </button>

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
        {loading ? (
          <div className="text-sm text-gray-500">Đang tải...</div>
        ) : posts.length === 0 ? (
          <div className="text-sm text-gray-500">Không có bài viết.</div>
        ) : (
          posts.map((a) => (
            <Link
              key={a.id}
              href={`/news/${a.id}`}
              className="flex gap-4 rounded border border-gray-200 bg-white p-4 shadow-sm"
            >
              <img
                src={a.image}
                alt={a.title}
                className="h-28 w-40 flex-none rounded object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-pink-500" />
                    <time className="text-sm text-gray-500">{a.time}</time>
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:underline">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-1">{a.excerpt}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
