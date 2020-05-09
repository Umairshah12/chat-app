import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  SignIn,
  SignInWithGoogle,
  SignInWithGithub,
} from "../component/helpers/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  function onHandlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function onHandleEmailChange(e) {
    setEmail(e.target.value);
  }

  async function onHandleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await SignIn(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  async function googleSignIn() {
    try {
      await SignInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  }

  async function githubSignIn() {
    try {
      await SignInWithGithub();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container">
      <Form
        onSubmit={onHandleSubmit}
        className="mt-5 py-5 px-5"
        autoComplete="off"
      >
        <h1>
          LogIn
          <Link className="title ml-2" to="/">
            Chatty
          </Link>
        </h1>
        <p className="lead">Fill in the Form below to create an account</p>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={onHandleEmailChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={onHandlePasswordChange}
            name="password"
          />
        </div>

        <div className="form-group">
          {error ? <p className="text-danger">{error}</p> : null}
          <button className="btn btn-primary px-5" type="submit">
            Login
          </button>
        </div>
        <p>you can also sign up with these services</p>

        <button
          className="btn btn-danger mr-2"
          type="button"
          onClick={googleSignIn}
        >
          Sign in with Google
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={githubSignIn}
        >
          Sign in with GitHub
        </button>
        <hr />
        <p>
          Already have an account
          <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  );
}
export default Login;
