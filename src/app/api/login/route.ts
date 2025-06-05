import { NextResponse } from "next/server";
import { getAdminKey } from "@/lib/server/keys";

export async function POST(req: Request) {
    const { password } = await req.json();
    const adminKey = await getAdminKey();

    if (password === adminKey) {
        const res = NextResponse.json({ success: true });
        res.cookies.set("admin-auth", password, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60,
            path: "/",
        });
        return res;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
