import { Provider } from 'react-redux'
import { ThemeProvider } from './providers/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from './store'
import { Routes } from 'routes'
import { ToastProvider } from 'providers/ToastProvider'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from 'providers/ApolloProvider'
import { config } from 'config'
import { WebSocketProvider } from 'providers/WebSocketProvider'
import { TimeoutProvider } from 'providers/TimeoutProvider'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider>
          <WebSocketProvider>
            <ToastProvider>
              <BrowserRouter basename={config.basename}>
                <ThemeProvider>
                  <TimeoutProvider>
                    <Routes />
                  </TimeoutProvider>
                </ThemeProvider>
              </BrowserRouter>
            </ToastProvider>
          </WebSocketProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
