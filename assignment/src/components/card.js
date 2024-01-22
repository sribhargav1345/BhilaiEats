import React, { useEffect,useState } from 'react'

export default function Card() {

    const [foodCat,setFoodCat] = useState([]);
    const [foodItem,setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        console.log(response[0],response[1]);
    }


    return (
        <div>
            <div className="card mt-3" style={{ "width": "20rem", "maxheight": "50px" }}>
                <img src="https://m.media-amazon.com/images/I/61fMDG0hW+L._AC_UF1000,1000_QL80_.jpg" style={{"height": "20rem"}} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                        This is some important text
                    </p>
                    <div className='container w-100'>

                        <select className="m-2 h-100 bg-success">
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>     {/* This select option is for selecting quantity */}

                        <select className="m-2 h-100 bg-success rounded=True">
                            <option className="half"> Half </option>
                            <option className="full"> Full </option>
                        </select>      {/* This select option is for selecting Half/Full */}

                        <div className="d-inline h-100 fs-6">
                            Total Price
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
