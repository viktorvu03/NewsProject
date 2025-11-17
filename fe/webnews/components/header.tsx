"use client";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { APICategories } from "@/services/APICategories";
import { CategoryResponse } from "@/types/Categories";
import { getAuth, clearAuth, User } from "@/Utils/MangerLocalStorage";

export default function Header() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeParam = searchParams?.get("categoryId") ?? "";
  const [authUser, setAuthUser] = useState<User | null>(() => {
    try {
      const a = getAuth();
      return (a && a.user) || null;
    } catch {
      return null;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await APICategories.getAllCategories();
        console.log(data);
        if (!cancelled && Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error("Lỗi khi call api load catergories:", err);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function onClickCategory(id: string) {
    const paramName = "categoryId";
    const search = id ? `?${paramName}=${encodeURIComponent(id)}` : "";
    // Always navigate to the posts list (home) with the category query
    router.push(`/${search}`);
  }

  return (
    <div className=" w-full h-32  flex items-center justify-center">
      <div className="flex items-center gap-3">
        <Link
          href={"/"}
          className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0"
        >
          <svg
            viewBox="0 0 64 64"
            width="28"
            height="28"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect x="6" y="10" width="52" height="44" rx="4" fill="#ffffff" />
            <rect x="14" y="18" width="28" height="8" rx="2" fill="#F97316" />
            <rect x="14" y="30" width="36" height="4" rx="2" fill="#E6E6E6" />
            <rect x="14" y="36" width="36" height="4" rx="2" fill="#E6E6E6" />
          </svg>
        </Link>

        <div className="leading-tight">
          <div className="text-lg font-semibold">Báo Nét News</div>
          <div className="text-xs text-gray-500">
            Tin tức • Bình luận • Sự kiện
          </div>
        </div>
      </div>
      <div className="w-[70%] h-full flex bg-white gap-[2%] items-center justify-center font-medium px-[1%]">
        <button
          onClick={() => onClickCategory("")}
          className={`hover:scale-110 px-[1%] w-auto  duration-200 h-full items-center flex bg-transparent border-0 ${
            activeParam === ""
              ? "text-orange-600 font-semibold"
              : "hover:text-orange-600"
          }`}
        >
          <h1>Tổng hợp</h1>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onClickCategory(String(category.id))}
            className={`hover:scale-110 px-[1%] w-auto  hover:text-orange-600 duration-200 h-full items-center flex bg-transparent border-0 ${
              String(activeParam) === String(category.id)
                ? "text-orange-600 font-semibold"
                : ""
            }`}
          >
            <h1>{category.name}</h1>
          </button>
        ))}
      </div>
      <div className=" flex items-center gap-[2%] w-[10%] h-full relative">
        <h1 className="text-4xl text-gray-600">|</h1>
        <CiUser className="text-3xl" />
        {!authUser ? (
          <Link
            href={"/login"}
            className=" w-auto h-[40%] hover:bg-amber-500 hover:underline underline hover:scale-110 hover:text-white duration-300 hover:font-bold border-amber-200 rounded-2xl px-2.5 mx-auto flex justify-between items-center"
          >
            <h1>Đăng nhập</h1>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
            >
              <span className="text-sm font-medium">
                {String(
                  authUser.fullName ?? authUser.userName ?? authUser.name ?? ""
                )}
              </span>
              <span className="text-3xl text-gray-500">▾</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded bg-white border shadow-md z-50">
                <ul className="flex flex-col">
                  {authUser.role === "01" && (
                    <li>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          router.push("/admin");
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50"
                      >
                        Quản trị
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        clearAuth();
                        setAuthUser(null);
                        setMenuOpen(false);
                        router.push("/");
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
