import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecoilRoot } from 'recoil';

console.log('!!!!!!!!!!!!');
window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker
      .register('./workers/sw.js')
      .then((result) => {
        console.log('service worker', result);
      })
      .catch((e) => console.error(e));
  } else {
    console.error('This browser is not supported service workers');
  }
});

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
