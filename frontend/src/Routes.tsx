import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:username" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
