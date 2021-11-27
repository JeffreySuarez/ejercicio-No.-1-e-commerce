import React, { useState } from "react";
import { auth, fs } from "../Firebase/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(fullName, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullName,
            Email: email,
            Password: password,
          })
          .then(() => {
            setSuccessMsg(
              "Signup Successfull. You will now automatically get redirected to Login"
            );
            setFullName("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              history.push("/login");
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Sign Up</h1>
      <hr></hr>
      {successMsg && (
        <>
          <div className="bg-success text-white">{successMsg}</div>
          <br></br>
        </>
      )}
      <form className="form-group" autoComplete="off" onSubmit={handleSignup}>
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        <br></br>
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
            Already have an account Login <Link to="login"> Here</Link>
          </span>
          <button type="submit" className="btn btn-success btn ">
            SIGN UP
          </button>
        </div>
      </form>
      {errorMsg && (
        <>
          <br></br>
          <div className="bg-danger text-white">{errorMsg}</div>
        </>
      )}
      <br></br>
      <br></br>
      <span>
        <Link to="./">Return</Link>
      </span>
    </div>
  );
};
