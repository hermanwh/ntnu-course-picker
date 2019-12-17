import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import Navbar from "./shared/Navbar/Navbar";
import { Router, Route, Switch } from "react-router-dom";
import Stuff1 from './Routes/Courses/Stuff1';
import Stuff2 from './Routes/Courses/Stuff2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Front from './Routes/Front/Front';

function App() {

  const history = createBrowserHistory({
    basename: ""
  });

  return (
    <div className="App"> 
      <Router history={history}>
        <div className="Nav">
          <Navbar />
        </div>

        <div className="Content">
        <Switch>
          <Route exact path="/" render={props => <Front {...props} />} />
          <Route exact path="/subpage2" render={props => <Stuff2 {...props} />} />
          <Route exact path="/subpage1" render={props => <Stuff1 {...props} />} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
