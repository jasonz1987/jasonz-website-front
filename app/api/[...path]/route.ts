import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const targetUrl = `https://backend.jason-z.com${url.pathname}${url.search}`;
    
    try {
        const response = await fetch(targetUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.error();
    }
} 