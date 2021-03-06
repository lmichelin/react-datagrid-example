import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './global.scss'
import App from './components/App'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)
