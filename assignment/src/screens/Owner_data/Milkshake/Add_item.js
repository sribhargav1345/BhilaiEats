import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar3 from '../../../components/Common_In_All/Navbar_signup';
import '../../Common_In_All/Login.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        CategoryName: "",
        name: "",
        img: "",
        options: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

          const response = await fetch("http://localhost:5000/api/Add_milkshake", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                  CategoryName: formData.CategoryName,
                  name: formData.name, 
                  img: formData.img,
                  options: formData.options,
              })
          });

          const json = await response.json();

          if (!json.success) {
              alert("Failed to addItem");
          } else {
              alert("Item Added successfully!");
          }

        console.log("Form Data:", formData);
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOptionsChange = (event) => {
        const { value, checked } = event.target;
        let updatedOptions = [...formData.options];

        if (checked) {
            updatedOptions.push(value);
        } else {
            updatedOptions = updatedOptions.filter(option => option !== value);
        }

        setFormData({ ...formData, options: updatedOptions });
    };

    return (
        <div className='login-container'>
            <Navbar3 />
            <div className='container'>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card" style={{ width: "500px" }}>
                            <div className="card-body">
                                <h2 className="text-center mb-4">Add an Item</h2>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="CategoryName" className="form-label">Category Name</label>
                                        <input type="text" className="form-control" name='CategoryName' value={formData.CategoryName} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={formData.name} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="img" className="form-label">Image URL</label>
                                        <input type="text" className="form-control" name='img' value={formData.img} onChange={onChange} />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Options</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="small" onChange={handleOptionsChange} />
                                            <label className="form-check-label">Small</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="big" onChange={handleOptionsChange} />
                                            <label className="form-check-label">Big</label>
                                        </div>
                                        {/* Add more options as needed */}
                                    </div>
                              
                                    <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                    <p className="text-center mb-0">Already have an account? <Link to="../login">Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
