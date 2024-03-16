import React, { useState } from 'react';
import Navbar3 from '../../components/Shop_Owner/Navbar_owner';

import './Add_item.css';

export default function Add_item() {
    const [formData, setFormData] = useState({
        categoryname: "",
        name: "",
        image: "",
        options: [{ size: "", price: "" }]
    });

    const cardHeight = 700 + formData.options.length * 50;

    const handleSubmit = async (e) => {

        var shopname = localStorage.getItem('shopname');
        console.log("shopname is", shopname);

        e.preventDefault();

        const response = await fetch("https://bhilaieats-1.onrender.com/api/CreateFood", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shopname: shopname,
                categoryname: formData.categoryname,
                name: formData.name,
                image: formData.image,
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

    const handleOptionChange = (index, size, price) => {
        const updatedOptions = [...formData.options];
        updatedOptions[index] = { size, price };
        setFormData({ ...formData, options: updatedOptions });
    };
    
    

    const addOption = () => {
        setFormData(prevState => ({
            ...prevState,
            options: [...prevState.options, { size: "", price: "" }]
        }));
    };

    const removeOption = (index) => {
        const updatedOptions = [...formData.options];
        updatedOptions.splice(index, 1);
        setFormData({ ...formData, options: updatedOptions });
    };

    return (
        <div className='login-container'>
            <Navbar3 />
            <div className='container'>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className='card5'>
                            <div className="card-body4">
                                <h2 className="text-center m-2" style={{marginTop:'2rem'}}>Add an Item</h2>
                                <hr className='mx-3'/>
                                <form onSubmit={handleSubmit}>
                                    <div className="m-3">
                                        <label htmlFor="categoryname" className="form-label">Category Name</label>
                                        <input type="text" className="form-control" name='categoryname' value={formData.categoryname} onChange={onChange} />
                                    </div>
                                    <div className="m-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={formData.name} onChange={onChange} />
                                    </div>
                                    <div className="m-3">
                                        <label htmlFor="image" className="form-label">Image URL</label>
                                        <input type="text" className="form-control" name='image' value={formData.image} onChange={onChange} />
                                    </div>

                                    <div className="m-3">
                                        <label className="form-label mr-3 ml-3 mb-3">Options</label>
                                        {formData.options.map((option, index) => (
                                            <div key={index} className="mb-2 d-flex flex-row">
                                                <span className="me-2">{index + 1}.</span>
                                                <input type="text" className="form-control me-2" style={{ borderRadius: "10px" }} placeholder="Size" value={option.size} onChange={(e) => handleOptionChange(index, e.target.value, option.price)} />
                                                <input type="text" className="form-control me-2" style={{ borderRadius: "10px" }} placeholder="Price" value={option.price} onChange={(e) => handleOptionChange(index, option.size, e.target.value)} />
                                                <button type="button" className="btn btn-danger btn-sm" style={{ height: "30px", borderRadius: "10px", marginLeft: "10px" }} onClick={() => removeOption(index)}>Remove</button> {/* Added marginLeft */}
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-primary m-2" onClick={addOption}>Add Option</button>
                                    </div>


                                    <button type="submit" className="btn btn-success w-75 m-3 mx-4">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
