import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";
import { Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Front from './Routes/Front/Front';
import CoursePicker from './Routes/Courses/CoursePicker';
import Summary from './Routes/Courses/Summary';

function App() {

  const history = createBrowserHistory({
    basename: ""
  });

  return (
    <div className="App"> 
      <Router history={history}>
        <div className="Nav" style={{'zIndex':'1000'}}>
          <Navbar />
        </div>

        <div className="Content">
        <Switch>
          <Route exact path="/" render={props => <CoursePicker {...props} />} />
          <Route exact path="/ntnu-course-picker/" render={props => <CoursePicker {...props} />} />
          <Route exact path="/courseSummary" render={props => <Summary {...props} />} />
          <Route exact path="/coursePicker" render={props => <CoursePicker {...props} />} />
        </Switch>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
