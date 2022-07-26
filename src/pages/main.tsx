import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { AppRoutes } from '../Router';
import { msalConfig } from '../services/B2C';
import { PublicClientApplication } from '@azure/msal-browser';
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider >
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AppRoutes msalInstance={msalInstance} />
        </ChakraProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);