import { NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'https://www.google.com'];
export function middleware(request: Request) {
    const origin = request.headers.get('origin') || '';
    console.log({ allowedOrigins, origin, includes: allowedOrigins.includes(origin) });

    // If you want to block postman, thunderclient, etc in production you can add in if the following condition. || !origin
    if(origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: 'Bad Request',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    console.log('Middleware!');

    console.log(request.method);
    console.log(request.url);

    return NextResponse.next();
}

/**
 * we can use also some conditionals for the url, or regex.
 */

export const config = {
    matcher: '/api/:path*',
}