import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CounterContextProvider } from './Context/CounterContext.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import PostContextProvider from './Context/PostContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
 <TokenContextProvider>
    <PostContextProvider>
      <CounterContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
        <Toaster position="top-right" reverseOrder={false} />
      </CounterContextProvider>
    </PostContextProvider>
  </TokenContextProvider>
)
