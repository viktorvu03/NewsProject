// ...existing code...
import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";
import { APIPost } from "@/services/APIPost";
import { Post as PostType } from "@/types/Post";
import { slugify } from "@/Utils/slugify";
import EvaluationSection from "@/components/EvaluationSection";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: PostType | undefined;
  let all: PostType[] = [];
  try {
    all = (await APIPost.getAllPost()) || [];
    if (Array.isArray(all)) {
      post = all.find(
        (p) => String(p.id) === slug || slugify(p.programName) === slug
      );
    }
  } catch {
    all = [];
  }

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

  // compute related posts (same category, exclude current)
  const related = (Array.isArray(all) ? all : [])
    .filter(
      (p) =>
        String(p.categoryId) === String(post.categoryId) && p.id !== post.id
    )
    .slice(0, 3);

  const fallbackImg =
    "https://hiepkiem.inplay.vn/_next/image?url=%2Fassets%2Fimages%2Fbanner-main%2Fbackground-banner-main.jpg&w=1200&q=75";
  // const isValidHttpUrl = (value?: string) => {
  //   if (!value) return false;
  //   try {
  //     const u = new URL(value);
  //     return u.protocol === "http:" || u.protocol === "https:";
  //   } catch {
  //     return false;
  //   }
  // };

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 bg-black gap-8"> */}
        <div className="w-full flex justify-center items-center">
          <article className="md:col-span-2 max-w-3xl">
            <h1 className="text-2xl font-bold mb-2">{post.programName}</h1>
            <time className="text-sm text-gray-500">{post.createTime}</time>
            <Image
              src={(post.img as string) || fallbackImg}
              alt={post.programName}
              width={1200}
              height={600}
              className="mt-4 w-full rounded object-cover"
            />
            <article className="mt-4 text-gray-700 leading-relaxed">
              <p>{post.depcription}</p>
            </article>
            <EvaluationSection postId={post.id} />
          </article>

          <aside className="absolute right-0 top-40 max-w-1xl bg-background  ">
            <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
              <h4 className="mb-3 text-sm font-semibold">
                Bài viết cùng chuyên mục
              </h4>
              {related.length === 0 && (
                <div className="text-sm text-gray-600">
                  Không có bài liên quan.
                </div>
              )}
              <ul className="space-y-3">
                {related.map((r) => {
                  return (
                    <li key={r.id} className="flex items-center gap-3">
                      <Link
                        href={`/news/${r.id}`}
                        className="flex items-center gap-3 w-full"
                      >
                        <Image
                          src={r.img || fallbackImg}
                          alt={r.programName}
                          width={500}
                          height={500}
                          className="h-16 w-24 rounded object-cover flex-none"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 max-w-xs line-clamp-1">
                            {r.programName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(
                              String(r.createTime)
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
