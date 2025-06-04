import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('admin-auth')?.value;

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin');

    if (isProtectedRoute && token !== process.env.ADMIN_KEY) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
