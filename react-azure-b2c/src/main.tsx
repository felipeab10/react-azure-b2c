import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// @ts-ignore
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from './services/B2C';
import "bootstrap/dist/css/bootstrap.min.css";


export const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App msalInstance={msalInstance} />
  </React.StrictMode>
);