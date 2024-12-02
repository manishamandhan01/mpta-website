import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter future={{
          v7_startTransition: true,
      }}>
          <App />

      </BrowserRouter>
  </StrictMode>,
)
