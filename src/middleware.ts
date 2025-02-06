import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const protectedRoutes = new Set(['/'])
  const reverseProtected = new Set(['/login', '/register'])

  const { pathname } = req.nextUrl
  const isProtectedRoute = protectedRoutes.has(pathname)
  const isReverseProtected = reverseProtected.has(pathname)

  // Read authentication token from cookies
  const userId = req.cookies.get('id')?.value

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isReverseProtected && userId) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

// Optimize the matcher to avoid excessive execution
export const config = {
  matcher: ['/', '/login', '/register']
}
