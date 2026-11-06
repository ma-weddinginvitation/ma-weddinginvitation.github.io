import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'

import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/pinyon-script/400.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
