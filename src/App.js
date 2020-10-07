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
import Admin from './pages/Admin/Admin';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Auth from './pages/Auth/Auth';
import ApproveReviewsContainer from './pages/Admin/pages/ApproveReviews/ApproveReviewsContainer';
import Feedback from './components/layout/Feedback';
import Schools from './pages/Schools/Schools';
import ApproveProfessorsContainer from './pages/Admin/pages/ApproveProfessors/ApproveProfessorsContainer';
import SavedProfessors from './pages/Admin/pages/SavedProfessors/SavedProfessors';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DirectionProvider>
        <Router>
          <Navbar />
          <PageContainer>
          <Feedback />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/search' component={Results} />
              <Route exact path='/professor/:id' component={Professor} />
              <Route exact path='/terms-of-service' component={TermsOfService} />
              <Route exact path='/privacy-policy' component={PrivacyPolicy} />
              <Route exact path='/about-us' component={AboutUs} />
              <Route exact path='/sign-in' component={Auth} />
              <Route exact path='/schools' component={Schools} />
              <ProtectedRoute exact minRole={1} path='/saved' component={SavedProfessors} />
              <ProtectedRoute exact minRole={1} path='/saved/:name' component={SavedProfessors} />
              <ProtectedRoute exact minRole={3} path='/admin' component={Admin} />
              <ProtectedRoute exact minRole={3} path='/admin/approve-reviews' component={ApproveReviewsContainer} />
              <ProtectedRoute exact minRole={3} path='/admin/approve-professors' component={ApproveProfessorsContainer} />
            </Switch>
          </PageContainer>
          {/* <Footer /> */}
        </Router>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default App;
