// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShopContextProvider from './Context/ShopContext';

ReactDOM.render(
    <ShopContextProvider>
        <App />
    </ShopContextProvider>,
    document.getElementById('root')
);
