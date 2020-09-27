import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import DirectionProvider from './contexts/DirectionProvider';
import Home from './pages/Home';
import Results from './pages/Results';
import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DirectionProvider>
        <Router>
          <Navbar />
          <Switch>
            <div className='page__container'>
              <Route exact path='/' component={Home} />
              <Route exact path='/search' component={Results} />
            </div>
          </Switch>
        </Router>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default App;
