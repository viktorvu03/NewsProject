"use client";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; label: string };

const FALLBACK: Category[] = [
  { id: "1", label: "Mới nhất" },
  { id: "2", label: "Thời sự" },
  { id: "3", label: "Dân sinh" },
  { id: "4", label: "Thể thao" },
  { id: "5", label: "Kinh tế" },
  { id: "6", label: "Công nghệ" },
];

export default function Header() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setCategories(data);
        }
      } catch (err) {
        // keep fallback
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function onClickCategory(id: string) {
    const url = new URL(window.location.href);
    const paramName = "categoryId";
    if (!id) url.searchParams.delete(paramName);
    else url.searchParams.set(paramName, id);
    router.push(url.pathname + url.search);
  }

  return (
    <div className=" w-full h-32  flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
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
        </div>

        <div className="leading-tight">
          <div className="text-lg font-semibold">Báo Nét News</div>
          <div className="text-xs text-gray-500">
            Tin tức • Bình luận • Sự kiện
          </div>
        </div>
      </div>
      <div className="w-[70%] h-full flex bg-white gap-[2%] items-center justify-center font-medium px-[1%]">
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onClickCategory(category.id)}
            className="hover:scale-110 px-[1%] w-auto  hover:text-orange-600 duration-200 h-full items-center flex bg-transparent border-0"
          >
            <h1>{category.label}</h1>
          </button>
        ))}
      </div>
      <div className=" flex items-center gap-[2%] w-[10%] h-full ">
        <h1 className="text-4xl text-gray-600">|</h1>
        <CiUser className="text-3xl" />
        <Link
          href={"/login"}
          className=" w-auto h-[40%] hover:bg-amber-500 hover:underline underline hover:scale-110 hover:text-white duration-300 hover:font-bold border-amber-200 rounded-2xl px-2.5 mx-auto flex justify-between items-center"
        >
          <h1>Đăng nhập</h1>
        </Link>
      </div>
    </div>
  );
}
