import React from 'react';
import SolutionPage from './pages/solution';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact strict path="/">
        <SolutionPage />
      </Route>
      <Route exact strict path="/solution">
        <SolutionPage />
      </Route>
      <Route>
        <div>404: Not Found</div>
      </Route>
    </Switch>
  </BrowserRouter>
);