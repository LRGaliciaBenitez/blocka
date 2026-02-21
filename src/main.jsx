import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from "react"
import { Provider } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css'
import store from './redux/store.js'
import { UIProvider } from './hooks/useComponentsUI.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UIProvider>
          <App />
        </UIProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
