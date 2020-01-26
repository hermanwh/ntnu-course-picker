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
import React from 'react';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { initializeApp } from 'firebase-admin';

const options = {
  timeout: 3500,
  position: positions.BOTTOM_CENTER,
  containerStyle: {
    zIndex: 100,
  }
};

function App() {

  const history = createBrowserHistory({
    basename: ""
  });

  return (
    <Provider template={AlertTemplate} {...options}>
      <div className="App"> 
        <Router history={history}>
          <div className="Nav" style={{'zIndex':'1000'}}>
            <Navbar />
          </div>

          <div className="Content">
          <Switch>
            <Route exact path="/" render={props => <Front {...props} />} />
            <Route exact path="/ntnu-course-picker/" render={props => <Front {...props} />} />
            <Route exact path="/coursePicker" render={props => <CoursePicker {...props} />} />
          </Switch>
          </div>
          <hr className="style-two"></hr>
          <div className="footer">
            <Footer />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
