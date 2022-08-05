import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
      </Switch>
    </Router>
  );
}

export default App;
