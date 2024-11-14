import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { StrictMode } from 'react'
import ThemeProvider from './context/theme_context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>

      <App />

    </ThemeProvider>
  </StrictMode>
)
