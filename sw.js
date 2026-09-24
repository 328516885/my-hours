// שירות רקע קטן: מאפשר התקנה כאפליקציה ופתיחה מהירה. תמיד מנסה קודם את הרשת.
const CACHE = "my-hours-v1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./", "./index.html", "./icon.svg", "./manifest.webmanifest"]).catch(() => {}))); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)).catch(() => {}); return res; }).catch(() => caches.match(r).then(m => m || caches.match("./index.html"))));
});
