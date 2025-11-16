import { NextResponse } from "next/server";

const POSTS = [
  {
    id: 1,
    title: "'Người mua hàng tin vào người nổi tiếng hơn tem kiểm định'",
    excerpt:
      "Theo Phó trưởng đoàn đại biểu Tây Ninh, người mua hàng tin vào người nổi tiếng hơn tem kiểm định nên cần kiểm soát chặt việc livestream của nhóm này.",
    time: "33' trước",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop",
    categoryId: "1",
  },
  {
    id: 2,
    title: "Vỡ mộng với giấc mơ vừa đi làm vừa du lịch châu Âu",
    excerpt:
      "Nữ du khách Anh Charlotte Grainger chuyển đến Bồ Đào Nha sống thử như một dân du mục số, nhưng thực tế khiến cô vỡ mộng.",
    time: "33' trước",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop",
    categoryId: "6",
  },
  {
    id: 3,
    title: "Anh rơi ra gầm tàu khi trèo xuống thang rút hành lý",
    excerpt:
      "Một hành khách gặp sự cố khi cố trèo xuống khu vực chứa hành lý và bị ngã xuống ray, may mắn không nguy hiểm đến tính mạng.",
    time: "1h trước",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60&auto=format&fit=crop",
    categoryId: "2",
  },
  {
    id: 4,
    title: "Bắt đầu mùa bóng đá",
    excerpt: "Lịch thi đấu và nhận định trước mùa giải mới.",
    time: "2h trước",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&q=60&auto=format&fit=crop",
    categoryId: "4",
  },
  {
    id: 5,
    title: "Chỉ số CPI tháng này tăng nhẹ",
    excerpt: "Các chuyên gia phân tích những yếu tố ảnh hưởng đến CPI.",
    time: "3h trước",
    image:
      "https://images.unsplash.com/photo-1542223616-ec2c3d1c1b2a?w=800&q=60&auto=format&fit=crop",
    categoryId: "5",
  },
];

export function GET(req: Request) {
  const url = new URL(req.url);
  const categoryId = url.searchParams.get("categoryId");

  if (!categoryId) return NextResponse.json(POSTS);

  const filtered = POSTS.filter((p) => p.categoryId === categoryId);
  return NextResponse.json(filtered);
}
