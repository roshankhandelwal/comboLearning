import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import InactivityTracker from './InactivityTracker'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InactivityTracker>
      <App />
    </InactivityTracker>
  </React.StrictMode>,
)
