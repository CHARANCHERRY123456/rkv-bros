import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {Toaster} from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"
import envVars from './config/config'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={envVars.VITE_GOOGLE_CLIENT_ID}>
    <Toaster position='top-center' reverseOrder={false} />  
      <App />
  </GoogleOAuthProvider>
  </StrictMode>,
)
