import Image from "next/image";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryTabs from "@/components/CategoryTabs";
type Article = {
  id: number;
  title: string;
  excerpt: string;
  time: string;
  image: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "'Người mua hàng tin vào người nổi tiếng hơn tem kiểm định'",
    excerpt:
      "Theo Phó trưởng đoàn đại biểu Tây Ninh, người mua hàng tin vào người nổi tiếng hơn tem kiểm định nên cần kiểm soát chặt việc livestream của nhóm này.",
    time: "33' trước",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Vỡ mộng với giấc mơ vừa đi làm vừa du lịch châu Âu",
    excerpt:
      "Nữ du khách Anh Charlotte Grainger chuyển đến Bồ Đào Nha sống thử như một dân du mục số, nhưng thực tế khiến cô vỡ mộng.",
    time: "33' trước",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <header className="bg-linear-to-r from-orange-600 to-orange-400 text-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    Tin nóng
                  </span>
                  <nav className="hidden sm:flex gap-2 text-xs text-white/90">
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

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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
                </div>
              </div>

              <div className="hidden md:block md:w-1/3 lg:w-1/4">
                <div className="relative overflow-hidden rounded-md shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1503264116251-35a269479413?w=1200&q=60&auto=format&fit=crop"
                    alt="banner"
                    height={600}
                    width={800}
                    className="h-36 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white">
                        Ảnh sự kiện
                      </span>
                      <p className="mt-1 max-w-xs text-sm text-white/90">
                        Báo cáo đặc biệt: xu hướng truyền thông 2025
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-block rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        HOT
                      </span>
                      <span className="hidden sm:inline-block rounded bg-white/10 px-2 py-1 text-xs text-white">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
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
                <CategoryTabs localArticles={articles} />
              </div>
            </section>

            <aside>
              <div className="space-y-6">
                <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=60&auto=format&fit=crop"
                    alt="ad"
                    width={299}
                    height={200}
                    className="w-full rounded object-cover"
                  />
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold">
                      SỐNG ĐẦY MỖI BÌNH MINH
                    </h4>
                    <p className="mt-1 text-xs text-gray-600">
                      Giao điểm năng lượng giữa khu đô thị biểu tượng
                    </p>
                  </div>
                </div>

                <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
                  <h4 className="mb-3 text-sm font-semibold">Tin nổi bật</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>- Giá xăng tăng nhẹ</li>
                    <li>- Tuyển sinh đại học: Lưu ý thay đổi</li>
                    <li>- Công nghệ: AI và tương lai</li>
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
