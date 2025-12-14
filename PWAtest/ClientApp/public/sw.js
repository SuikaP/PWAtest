// public/sw.js
// 這是最基礎的 Service Worker，為了滿足 PWA 安裝條件
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {chrome://vivaldi-webui/startpage?section=Speed-dials&background-color=#2f2f2f
    // 這裡可以加入快取邏輯，目前先直接回傳網絡請求
});