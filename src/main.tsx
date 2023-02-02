import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import TodoProvider from "./context/todoContext";
import TimerProvider from './context/timerContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </TodoProvider>
  </React.StrictMode>
)
