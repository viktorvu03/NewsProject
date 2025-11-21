"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "@/types/Post";

type Props = { posts: Post[] };

export default function BannerCarousel({ posts }: Props) {
  const images = (posts || [])
    .map((p) => (p.img ? (p.img as string) : undefined))
    .filter(Boolean) as string[];

  const fallback =
    "https://images.unsplash.com/photo-1503264116251-35a269479413?w=1200&q=60&auto=format&fit=crop";

  const slides = images.length > 0 ? images : [fallback];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-md shadow-lg">
      <div className="relative h-36 w-full">
        <Image
          src={slides[index]}
          alt={`banner-${index}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

      <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between">
        <div>
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white">
            Ảnh bài viết
          </span>
          <p className="mt-1 max-w-xs text-sm text-white/90 line-clamp-1">
            Thông tin liên tục
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 w-8 rounded-full ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
