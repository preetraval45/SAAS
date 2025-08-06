import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes and API routes
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // Skip static files
  ) {
    return NextResponse.next();
  }

  // Check for authentication token in cookies
  const token = request.cookies.get('access_token');
  
  if (!token && pathname !== '/login') {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Role-based route protection
  const userRole = request.cookies.get('user_role')?.value;
  
  // Define protected routes and required roles
  const roleProtectedRoutes = {
    '/users': ['SuperUser', 'Admin'],
    '/tasks': ['SuperUser', 'Admin'],
    '/settings': ['SuperUser']
  };

  // Check if current path requires specific role
  for (const [route, allowedRoles] of Object.entries(roleProtectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
