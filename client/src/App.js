import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import MainSite from "./components/MainSite";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/nastaveni" component={Settings} />
        <Route exact path="/statistiky" component={Statistics} />
        <Route exact path="/" component={MainSite} />
      </Switch>
    </Router>
  );
}

export default App;
