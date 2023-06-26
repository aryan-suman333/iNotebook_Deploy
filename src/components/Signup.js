import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://iNotebook.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Successfully Signed Up", "success");
      Navigate("/");
    }
    else { props.showAlert("Invalid Credentials", "danger"); }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="text" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" autoComplete="on" className="form-control" id="password" name="password" value={credentials.password} minLength={5} required onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" autoComplete="on" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
