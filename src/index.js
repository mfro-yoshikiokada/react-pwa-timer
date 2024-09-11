import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Workerを登録して、オフラインサポートとプッシュ通知を有効にする
serviceWorkerRegistration.register(); // unregister()からregister()に変更

// アプリのパフォーマンスを測定するための関数
reportWebVitals();
