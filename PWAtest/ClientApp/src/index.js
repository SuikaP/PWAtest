import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

if (redirect) {
    window.history.replaceState(null, "", redirect);
}

ReactDOM.render(
  <BrowserRouter basename="/PWAtest">
    <App />
  </BrowserRouter>,
  rootElement);

/*registerServiceWorker();

// Â²³æªº Service Worker µù¥UÀË¬d
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/PWAtest/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}*/