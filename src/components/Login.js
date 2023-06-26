import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  let Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch(`https://iNotebook.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Successfully Logged In", "success");
      Navigate("/");
    }
    else { props.showAlert("Invalid Credentials", "danger"); }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h3 className="mb-3">Please Log In to Continue...</h3>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" autoComplete="on" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  )
}

export default Login;
