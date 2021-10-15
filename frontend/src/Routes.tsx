import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Home from './Home';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/:username" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
