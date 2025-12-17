import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 如果您有這個檔案就保留，沒有的話這行刪除也不會報錯
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("錯誤：找不到 id 為 root 的元素，請檢查 public/index.html");
}

// --- PWA Service Worker 註冊設定 (簡潔版) ---
// 這裡會去註冊我們放在 public 資料夾裡的 sw.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 注意：這裡的 /sw.js 對應的是 public/sw.js
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker 註冊成功: ', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker 註冊失敗: ', error);
            });
    });
}