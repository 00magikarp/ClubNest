import { NextResponse } from "next/server";
import {updateClub} from "@/lib/server/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await updateClub(data);
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
