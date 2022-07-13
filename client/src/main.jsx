import React from 'react'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { AuthProvider  } from './context/AuthProvider'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
      <App /> 
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)