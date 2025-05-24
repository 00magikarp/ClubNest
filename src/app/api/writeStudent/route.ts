import { addStudent } from "@/lib/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const added = await addStudent(data);
    if (added) {
      return NextResponse.json({}, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
