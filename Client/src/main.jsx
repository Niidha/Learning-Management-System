import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { persistor, store } from './Redux/store.jsx'

import { PersistGate } from 'redux-persist/integration/react';
import { FavoritesProvider } from './student/favProvider.jsx';

createRoot(document.getElementById('root')).render(
<PersistGate loading={null} persistor={persistor}>
<FavoritesProvider>
  <Provider store={store}>
  <App />
  <Toaster position='top-right'/>
  </Provider>
  </FavoritesProvider>
</PersistGate>

)


