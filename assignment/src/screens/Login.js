import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "", userType: "user" }); // Default userType to "user"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = "";
    
    if (credentials.userType === "user") {
      apiUrl = "http://localhost:5000/api/loginUser";
    } else if (credentials.userType === "admin") {
      apiUrl = "http://localhost:5000/api/loginAdmin";
      console.log("I'm an admin");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
      return; // Exit early if login is unsuccessful
    }

    // Login successful
    localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("authToken", json.authToken);

    if (credentials.userType === "admin") {
      console.log("I came here");
      const ownersResponse = await fetch("http://localhost:5000/api/owners");
      const ownersData = await ownersResponse.json();
      
      console.log("Owners:", ownersData[0].email);
      console.log("Cred: ",credentials.email);

      for (const ownerArray of ownersData) {
        for (const owner of ownerArray) {
          if (owner.email === credentials.email) {
            console.log("Owner found:", owner);
            navigate(`/owner_${owner._id}`);
            return;
          }
        }
      }
    }

    // Default navigation for regular users or if admin owner not found
    navigate("/");
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='login-container'>
      <Navbar2 />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body" style={{ height: "470px" }}>
                <h2 className="text-center">Login</h2>
                <hr className='mb-3' style={{ borderTop: '1px dotted black' }} />
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="userType" className="form-label">User Type</label>
                    <select className="form-control custom-select" name="userType" value={credentials.userType} onChange={onChange}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                  <p className="text-center mb-0">New User? <Link to="../signup">Sign Up</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
