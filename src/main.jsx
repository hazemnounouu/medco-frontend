import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './shared/context/AuthContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>

  </StrictMode>,
)
