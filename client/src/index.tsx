import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
