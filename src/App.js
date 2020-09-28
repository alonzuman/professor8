import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Professor from './pages/Professor/Professor';
import Navbar from './components/layout/Navbar';
import PageContainer from './containers/PageContainer';
import DirectionProvider from './contexts/DirectionProvider';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import theme from './utils/theme';
import Footer from './components/layout/Footer';
import TermsOfService from './pages/Static/TermsOfService';
import PrivacyPolicy from './pages/Static/PrivacyPolicy';
import AboutUs from './pages/Static/AboutUs';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DirectionProvider>
        <Router>
            <Navbar />
            <Switch>
              <PageContainer>
                <Route exact path='/' component={Home} />
                <Route path='/search' component={Results} />
                <Route path='/professor/:id' component={Professor} />
                <Route path='/terms-of-service' component={TermsOfService} />
                <Route path='/privacy-policy' component={PrivacyPolicy} />
                <Route path='/about-us' component={AboutUs} />
              </PageContainer>
            </Switch>
            <Footer />
        </Router>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default App;
