// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import App from './App.jsx'
// import ContextProvider from './Context/Context.jsx'

// createRoot(document.getElementById('root')).render(
//   <ContextProvider>
//   <StrictMode>
//     <App />
//   </StrictMode>
//   </ContextProvider>
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import ContextProvider from './Context/Context.jsx'

// استبدل هذا بالـ Client ID الخاص بك من Google Cloud Console
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = '1050409613465-e21bsq1h94ti1740asgph24uhmhef6ja.apps.googleusercontent.com';


createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <StrictMode>
        <App />
      </StrictMode>
    </GoogleOAuthProvider>
  </ContextProvider>
)

