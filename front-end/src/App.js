import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
      </Switch>
    </Router>
  );
}

export default App;
