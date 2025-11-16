import { NextResponse } from "next/server";

const CATEGORIES = [
  { id: "1", label: "Mới nhất" },
  { id: "2", label: "Thời sự" },
  { id: "3", label: "Dân sinh" },
  { id: "4", label: "Thể thao" },
  { id: "5", label: "Kinh tế" },
  { id: "6", label: "Công nghệ" },
];

export function GET() {
  return NextResponse.json(CATEGORIES);
}
