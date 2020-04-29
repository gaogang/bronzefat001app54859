import React from 'react';
import SolutionPage from './pages/Solution';
import SolutionListPage from './pages/SolutionList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact strict path="/">
        <SolutionListPage />
      </Route>
      <Route exact strict path="/solutionList">
        <SolutionListPage />
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