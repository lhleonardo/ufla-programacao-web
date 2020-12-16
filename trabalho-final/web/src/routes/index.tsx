import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import NewTransaction from '../pages/NewTransaction';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/new" component={NewTransaction} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
