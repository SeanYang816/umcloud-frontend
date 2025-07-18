import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const config = window.__CONFIG__
console.log('Using backend:', config.VITE_APP_BACKEND_URI)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
)
