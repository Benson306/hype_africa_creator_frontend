import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CreatorAuthProvider } from './utils/CreatorAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreatorAuthProvider>
      <App />
    </CreatorAuthProvider>
  </React.StrictMode>
);


