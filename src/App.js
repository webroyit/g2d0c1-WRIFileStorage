import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/authentication/PrivateRoute'
import Profile from './components/authentication/Profile'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
import UpdateProfile from './components/authentication/UpdateProfile'
import Dashboard from './components/google-drive/Dashboard'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Drive */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Auth */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
