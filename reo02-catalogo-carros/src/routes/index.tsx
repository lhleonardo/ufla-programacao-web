import React from "react";
import { Switch, Route } from "react-router-dom";
import { CreateCar } from "../pages/Create";
import { EditCar } from "../pages/Edit";
import { Details } from "../pages/Details";
import { Home } from "../pages/Home";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/create" component={CreateCar} />
    <Route path="/details/:id" component={Details} />
    <Route path="/edit/:id" component={EditCar} />
  </Switch>
);
