import React, { useState } from "react";
import { auth } from "../Firebase/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSuccessMsg(
          "Login Successfull. You will now automatically get redirected to Home page"
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          history.push("/");
        }, 3000);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  return (
    <div>
      <div className="container">
        <br></br>
        <br></br>
        <h1>Login</h1>

        <hr></hr>
        {successMsg && (
          <>
            <div className="bg-success text-white">{successMsg}</div>
            <br></br>
          </>
        )}
        <form className="form-group" autoComplete="off" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br></br>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br></br>
          <div className="d-flex justify-content-between">
            <span>
              Already have an account SignUp
              <Link to="signup" className="link">
                {" "}
                Here
              </Link>
            </span>
            <button type="submit" className="btn btn-success btn-md ">
              LOGIN
            </button>
          </div>
        </form>
        {errorMsg && (
          <>
            <br></br>
            <div className="bg-danger text-white">{errorMsg}</div>
          </>
        )}
      </div>
      <br></br>
      <br></br>
      <span>
        <Link to="./">Return</Link>
      </span>
    </div>
  );
};
