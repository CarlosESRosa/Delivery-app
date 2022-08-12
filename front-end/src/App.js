import React from 'react';
import './App.css';
import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import Order from './pages/Order';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/customer/orders/:id" element={ <Order /> } />
        <Route exact path="/seller/orders" element={ <Orders /> } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
