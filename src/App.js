import React from 'react';
import SolutionListPage from './pages/solutionList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact strict path="/">
        <SolutionListPage />
      </Route>
      <Route exact strict path="/solution">
        <SolutionListPage />
      </Route>
      <Route>
        <div>404: Not Found</div>
      </Route>
    </Switch>
  </BrowserRouter>
);