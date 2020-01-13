import React, { useState, useContext } from "react";
import { AuthContext, user } from "../../Routes/Courses/CoursePicker.js";

import * as firebase from 'firebase'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {

    e.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      if (res.user) {
        Auth.setLoggedIn(true);
        Auth.downloadButtonPressed();
        Auth.setLoggingIn(false);
      } 
    })
    .catch(e => {
      setErrors(e.message);
    });
  };

  return (
    <div style={{'paddingBottom':'40px'}}>
      <form onSubmit={e => handleForm(e)}>
        <div className="css-yk16xz-control" style={{'width':'300px', 'margin':'0 auto'}}>
            <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Epost"
            className="freetextInput"
            />
        </div>
        <div className="css-yk16xz-control" style={{'width':'300px', 'margin':'0 auto', 'marginTop':'10px', 'marginBottom':'10px'}}>
            <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="Passord"
            className="freetextInput"
            />
        </div>
        <div className="button-3" style={{'width':'300px'}}>
            <div className="circle"></div>
            <button type="submit">Logg inn</button>
        </div>
        <br></br>
        <span style={{'color':'white'}}>{error}</span>
      </form>
    </div>
  );
};

export default Login;