const CACHE_NAME = "barbershop-cache-v1";
const urlsToCache = [
  "/",              
  "/index.html",    
  "/public/manifest.json",  
  "/logo/192.png.png",   
  "/logo/512.png.png",
  "/src/main.jsx",   
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")
        )
      );
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-reservations") {
    event.waitUntil(syncReservations());
  }
});

async function syncReservations() {
  console.log("Background sync triggered: syncing reservations...");
}
