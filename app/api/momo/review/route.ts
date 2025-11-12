import { NextResponse } from "next/server";

const PRIMARY_KEY = process.env.MOMO_PRIMARY_KEY; // cba0fe345ba34f068e861889deb2a4fe
const COLLECTION_URL =
  "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceId = searchParams.get("referenceId");

    if (!referenceId) {
      return NextResponse.json(
        { error: "Reference ID is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${COLLECTION_URL}/${referenceId}`, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": PRIMARY_KEY!,
        Authorization: `Bearer ${process.env.MOMO_ACCESS_TOKEN}`, // generate token before
        "X-Target-Environment": "sandbox",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: "Failed to get status", details: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
