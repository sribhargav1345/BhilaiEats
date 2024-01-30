import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import './Login.css';
import Milkshakes from './Home_Admin';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "", userType: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = "";
    var flag = 0;

    if (credentials.userType === "user") {
      apiUrl = "http://localhost:5000/api/loginUser";                 // API endpoint for user login
      
      
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
      }
  
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
  
        navigate("/")
      }

    } else if (credentials.userType === "admin") {
      apiUrl = "http://localhost:5000/api/loginAdmin";                // API endpoint for admin login
      

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
      }
  
      if (json.success) {
  
        const response = await fetch("http://localhost:5000/api/owners", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
    
        const data = await response.json();

        for(const item in data){
          if(item.email === credentials.email){
            navigate(`/owner_${item._id}`);
            break;
          }
        }
      }

    }
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