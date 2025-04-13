import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './Context/ShopContext.jsx';
import { UserContextProvider } from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <ShopContextProvider>
      <UserContextProvider>
        <App />
    </UserContextProvider>
    </ShopContextProvider>
  
)