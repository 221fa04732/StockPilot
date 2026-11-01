import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const privatePages = createRouteMatcher([
  '/product(.*)', '/supplier(.*)', '/transcation(.*)', '/ai(.*)', '/report(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (privatePages(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
