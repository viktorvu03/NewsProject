import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, data } = body as { filename?: string; data?: string };
    if (!data) return NextResponse.json({ error: "No data" }, { status: 400 });

    const matches = (data || "").match(/^data:(.+);base64,(.*)$/);
    let buffer: Buffer;
    let ext = "png";
    if (matches) {
      const mime = matches[1];
      const b64 = matches[2];
      buffer = Buffer.from(b64, "base64");
      const mimeParts = mime.split("/");
      if (mimeParts[1]) ext = mimeParts[1].split("+")[0];
    } else {
      buffer = Buffer.from(data, "base64");
    }

    const uploadsDir = path.join(process.cwd(), "public", "assets", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // const safeName = filename
    //   ? filename.replace(/[^a-zA-Z0-9._-]/g, "_")
    //   : `img_${Date.now()}.${ext}`;
    const finalName =
      filename && filename.includes(".")
        ? filename.replace(/[^a-zA-Z0-9._-]/g, "_")
        : `img_${Date.now()}.${ext}`;
    const savePath = path.join(uploadsDir, finalName);

    await fs.promises.writeFile(savePath, buffer);

    const url = `/assets/uploads/${finalName}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("uploadImage error", err);
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }
}
