import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// PWA: registra o service worker (só em produção) e recarrega sozinho quando sair versão nova,
// pra o quadro que fica ligado numa tela não ficar preso numa versão antiga.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const hadController = !!navigator.serviceWorker.controller
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(err => console.error('Falha ao registrar o service worker:', err))

    let reloading = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloading) return // primeira instalação não precisa recarregar
      reloading = true
      window.location.reload()
    })
  })
}
