import Image from "next/image";
import React from "react";
import BannerCarousel from "@/components/BannerCarousel";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryTabs from "@/components/CategoryTabs";
import { Post } from "@/types/Post";
import { APIPost } from "@/services/APIPost";
import Link from "next/link";

export default async function Home() {
  const posts: Post[] = await APIPost.getAllPost().catch(() => []);
  const fallbackImg =
    "https://dhtn.ttxvn.org.vn/Images/images/Boi%20Duong%20Nghiep%20Vu/Noi%20San%20Thong%20Tan/Nam%202023/So%205/NSTT/18.jpg";
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <header className="bg-linear-to-r from-orange-600 to-orange-400 text-white">
          {/* đây là banner */}
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  {/* <span className="inline-block rounded-full  px-3 py-1 text-xs font-semibold text-white">
                    Tin nóng
                  </span> */}
                  <nav className="hidden sm:flex gap-2 text-lg font-semibold text-white/90">
                    <a className="px-2 py-1 rounded hover:bg-white/10">
                      Tin nóng
                    </a>
                    <a className="px-2 py-1 rounded hover:bg-white/10">
                      Chính trị
                    </a>
                    <a className="px-2 py-1 rounded hover:bg-white/10">
                      Kinh tế
                    </a>
                    <a className="px-2 py-1 rounded hover:bg-white/10">
                      Công nghệ
                    </a>
                    <a className="px-2 py-1 rounded hover:bg-white/10">
                      Thể thao
                    </a>
                  </nav>
                </div>

                <h1 className="text-3xl font-extrabold leading-tight text-white">
                  Thông tin chuẩn quốc tế
                </h1>
                <p className="mt-2 max-w-xl text-sm text-white/90">
                  Cung cấp thông tin đầy đủ kịp thời tới bạn đọc — phân tích,
                  điều tra và góc nhìn chuyên sâu.
                </p>

                {/* <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <form className="flex w-full max-w-md items-center gap-2 rounded bg-white/10 p-1 pr-2 backdrop-blur-sm">
                    <input
                      aria-label="Tìm kiếm"
                      placeholder="Tìm bài viết, chủ đề..."
                      className="w-full bg-transparent px-3 py-2 text-white placeholder:text-white/70 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
                    >
                      Tìm
                    </button>
                  </form>

                  <div className="hidden sm:flex items-center gap-3 text-sm text-white/90">
                    <span className="text-xs text-white/70">Mới nhất:</span>
                    <div className="flex max-w-xs gap-3 overflow-hidden">
                      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
                        <span className="mr-6">• Giá xăng tăng nhẹ</span>
                        <span className="mr-6">
                          • Tuyển sinh đại học: Lưu ý thay đổi
                        </span>
                        <span className="mr-6">
                          • AI thay đổi ngành truyền thông
                        </span>
                        <span className="mr-6">
                          • Biến động thị trường chứng khoán
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="hidden md:block md:w-1/3 lg:w-1/4">
                {/* Banner carousel using images from posts */}
                <div>
                  <BannerCarousel posts={posts} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <section className="md:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Mới nhất</h2>
              </div>

              <div className="space-y-6">
                <CategoryTabs localArticles={posts} />
              </div>
            </section>

            <aside>
              <div className="space-y-6">
                <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
                  <Image
                    src={fallbackImg}
                    alt="ad"
                    width={299}
                    height={200}
                    className="w-full rounded object-cover"
                  />
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold">TIN TỨC NÓNG HỔI</h4>
                    <p className="mt-1 text-xs text-gray-600">
                      Giao điểm thông tin thế giới
                    </p>
                  </div>
                </div>

                <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
                  <h4 className="mb-3 text-xs font-semibold">Tin nổi bật</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {posts && posts.length > 0 ? (
                      posts.slice(0, 5).map((p) => (
                        <li
                          className="hover:font-bold hover:scale-105 hover:underline duration-300"
                          key={p.id}
                        >
                          <Link href={`/news/${p.id}`}>
                            {" "}
                            - {p.programName ?? "(Untitled)"}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>Không có bài viết nổi bật</li>
                    )}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
