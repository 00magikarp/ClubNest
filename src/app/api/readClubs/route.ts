import { readClubs } from "@/lib/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clubs = await readClubs();
    return NextResponse.json(clubs);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
