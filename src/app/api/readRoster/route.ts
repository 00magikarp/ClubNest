import { readRoster } from "@/lib/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roster = await readRoster();
    return NextResponse.json(roster);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
