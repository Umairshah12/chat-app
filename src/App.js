import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

// import * as firebase from "firebase";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingnUp from "./pages/SignUp";
import { auth } from "./Services/firebase";
import { Button, Spinner } from "react-bootstrap";
import "./pages/style.css";
// import PrivateRoute from "./Routes/PrivateRoute";
// import PublicRoute from "./Routes/PublicRoute";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("use effect called");
    auth().onAuthStateChanged(function (user) {
      // console.log(user);
      if (user) {
        // console.log("use effect called");
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  return loading === true ? (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/chat"
          component={Chat}
          authenticated={authenticated}
        />
        <PublicRoute
          path="/signup"
          component={SingnUp}
          authenticated={authenticated}
        />
        <PublicRoute
          path="/login"
          component={Login}
          authenticated={authenticated}
        />
      </Switch>
    </Router>
  );
}

export default App;
