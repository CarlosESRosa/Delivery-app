import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" element={ <Register /> } />
      </Switch>
    </Router>
  );
}

export default App;
