import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Professor from './pages/Professor';

function App() {
  return (
    <div dir='rtl'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/professor/:id' component={Professor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
