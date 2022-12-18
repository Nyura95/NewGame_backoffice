import React from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { store, persistor } from './app/store'
import Notify from './features/notify/Notify'
import reportWebVitals from './reportWebVitals'

import './i18n'
import './app.css'

import '@cityscoot/components/src/Template/assets/css/nucleo-icons.css'
import '@cityscoot/components/src/Template/assets/css/nucleo-svg.css'
import '@cityscoot/components/src/Template/assets/css/material-dashboard.css'

// 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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="443492310861-46iftk49p5esfkg72ovngka72ecabvth.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Notify />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
