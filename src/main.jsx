import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './shared/context/AuthContext.jsx'


import './index.css'
import './App.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>

  </StrictMode>,
)
