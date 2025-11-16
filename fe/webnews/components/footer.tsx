// ...existing code...
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold">Báo Nét News</h3>
            <p className="text-sm text-gray-400 mt-2">
              Tin tức nhanh — Bình luận sâu — Sự kiện nóng hổi.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded hover:bg-gray-800"
              >
                <FaFacebook className="text-3xl" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded hover:bg-gray-800"
              >
                <FaTwitter className="text-3xl" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded hover:bg-gray-800"
              >
                <IoIosMail className="text-4xl" />
              </a>
            </div>
          </div>

          <div className="flex justify-between md:justify-center md:col-span-2">
            <div>
              <h4 className="text-sm font-semibold mb-3">Chuyên mục</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#">
                    <h1 className="hover:text-white ">Mới nhất</h1>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <h1 className="hover:text-white">Thời sự</h1>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <h1 className="hover:text-white">Kinh tế</h1>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <h1 className="hover:text-white">Thể thao</h1>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Liên hệ</h4>
              <p className="text-sm text-gray-400">Email: contact@netnews.vn</p>
              <p className="text-sm text-gray-400 mt-1">Hotline: 1900-1234</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xl text-gray-500">
          © {year} Báo Nét News. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
}
