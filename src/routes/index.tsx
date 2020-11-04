import React from "react";
import { Switch, Route } from "react-router-dom";
import { Details } from "../pages/Details";
import { Home } from "../pages/Home";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/details" component={Details} />
  </Switch>
);
