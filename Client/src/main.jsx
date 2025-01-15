import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './Redux/store.jsx'

createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
  <App />
  <Toaster position='top-right'/>
  </Provider>

)


