import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { Workbox } from 'workbox-window';

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw.js');
    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm(`New app update is available!. Click OK to refresh`)) {
          window.location.reload();
        }
      }
    });
    wb.register();
  }
});
