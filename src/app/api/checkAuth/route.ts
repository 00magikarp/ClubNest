import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-auth");

    if (token?.value === process.env.ADMIN_KEY) {
        return NextResponse.json({ loggedIn: true });
    }

    return NextResponse.json({ loggedIn: false });
}