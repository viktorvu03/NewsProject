// ...existing code...
import Image from "next/image";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";
import { APIPost } from "@/services/APIPost";
import { Post as PostType } from "@/types/Post";
import { slugify } from "@/Utils/slugify";
import EvaluationSection from "@/components/EvaluationSection";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // load all posts and find match by slug or id
  let post: PostType | undefined;
  try {
    const all: PostType[] = await APIPost.getAllPost();
    if (Array.isArray(all)) {
      post = all.find(
        (p) => String(p.id) === slug || slugify(p.programName) === slug
      );
    }
  } catch {}

  if (!post) {
    const sample: PostType = {
      id: 1,
      programName: "'Người mua hàng tin vào người nổi tiếng hơn tem kiểm định'",
      depcription:
        "Theo Phó trưởng đoàn đại biểu Tây Ninh, người mua hàng tin vào người nổi tiếng hơn tem kiểm định...",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=60&auto=format&fit=crop",
      categoryId: 1,
      createTime: new Date().toISOString(),
    };
    if (String(sample.id) === slug || slugify(sample.programName) === slug)
      post = sample;
  }

  if (!post) return notFound();

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{post.programName}</h1>
        <time className="text-sm text-gray-500">{post.createTime}</time>
        <img
          src={
            (post.img as string) ||
            "https://via.placeholder.com/1200x600?text=No+Image"
          }
          alt={post.programName}
          width={1200}
          height={600}
          className="mt-4 rounded object-cover"
        />
        <article className="mt-4 text-gray-700 leading-relaxed">
          <p>{post.depcription}</p>
        </article>
        <EvaluationSection postId={post.id} />
      </main>
      <Footer />
    </div>
  );
}
