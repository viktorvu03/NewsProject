// ...existing code...
import Image from "next/image";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  time?: string;
  image: string;
  slug?: string;
};

const LOCAL_ARTICLES: Article[] = [
  {
    id: 1,
    title: "'Người mua hàng tin vào người nổi tiếng hơn tem kiểm định'",
    excerpt:
      "Theo Phó trưởng đoàn đại biểu Tây Ninh, người mua hàng tin vào người nổi tiếng hơn tem kiểm định...",
    content:
      "Nội dung chi tiết bài báo ở đây. Thêm paragraph, hình ảnh, dữ liệu v.v.",
    time: "33' trước",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=60&auto=format&fit=crop",
    slug: "1",
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ...existing code...
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; // params là Promise — unwrap nó
}) {
  const { slug } = await params; // <-- quan trọng: await params

  let article: Article | undefined;
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || "";
    const url = base ? `${base}/api/articles/${slug}` : `/api/articles/${slug}`;
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) article = await res.json();
  } catch (e) {}

  if (!article) {
    article =
      LOCAL_ARTICLES.find((a) => String(a.id) === slug || a.slug === slug) ||
      LOCAL_ARTICLES.find((a) => slugify(a.title) === slug);
  }

  if (!article) return notFound();

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <time className="text-sm text-gray-500">{article.time}</time>
        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={600}
          className="mt-4 rounded object-cover"
        />
        <article className="mt-4 text-gray-700 leading-relaxed">
          <p>{article.content || article.excerpt}</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
