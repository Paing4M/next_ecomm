import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'
import {NextResponse} from "next/server";

const isProtectedRoute = createRouteMatcher(['/purchase-success(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();

  if (isAdminRoute(req) && user.sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
  if (isProtectedRoute(req) && !user.userId) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}