// Cloudflare Pages function — Accept-Language redirect for root path.
// Remove this file if not deploying to Cloudflare Pages.
export const onRequest: PagesFunction = ({ request }) => {
  const accept = request.headers.get("Accept-Language") ?? "";
  const lang = accept.includes("ar") ? "ar" : "en";
  return Response.redirect(new URL(`/${lang}/`, request.url), 302);
};
