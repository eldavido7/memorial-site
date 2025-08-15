// app/api/gallery/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json(
            { error: "Missing Cloudinary env vars" },
            { status: 500 }
        );
    }

    const { searchParams } = new URL(req.url);
    const nextCursor = searchParams.get("next_cursor") || "";

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const url = new URL(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`
    );
    url.searchParams.set("max_results", "100");
    // Optional: sort newest first (default usually desc but being explicit is safer)
    url.searchParams.set("direction", "desc");
    if (nextCursor) url.searchParams.set("next_cursor", nextCursor);

    const res = await fetch(url.toString(), {
        headers: { Authorization: `Basic ${auth}` },
        cache: "no-store",
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }

    const data = await res.json();

    // Return minimal fields only
    const images = (data.resources || []).map((img: any) => ({
        id: img.asset_id as string,
        // We'll still send secure_url, but the client will add f_auto,q_auto
        src: img.secure_url as string,
        // Keep public_id as a fallback identifier (useful for de-dupe if needed)
        pid: img.public_id as string,
    }));

    return NextResponse.json({
        images,
        next_cursor: data.next_cursor || null,
    });
}
