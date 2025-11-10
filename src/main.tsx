// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'  // Используем default import
import './index.css'     // Если этот файл существует

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)