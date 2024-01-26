import React, { useEffect,useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    // const [foodCat,setFoodCat] = useState([]);
    // const [foodItem,setFoodItem] = useState([]);

    // const loadData = async () => {
    //     let response = await fetch("http://localhost:5000/api/foodData", {
    //         method:"POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     response = await response.json();

    //     console.log(response[0],response[1]);
    // }

    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();

    let options  = props.options;
    let priceOptions = Object.keys(options);

    const [qty,setQty] = useState(1)
    const [size,setsize] = useState("")

    const handleAddToCar = async() => {

        let food = []
        for(const item of data) {
            if(item.id ===  props.foodItem._id){
                food = item;

                break;
            }
        }
        if(food != [])
        {
            if(food.size === size)
            {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty});
                return;
            }
            else if(food.size != size)
            {
                await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.anme, price: props.finalPrice, qty:qty, size:size});
                return;
            }
            return;
        }
        await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.anme, price: props.finalPrice, qty:qty, size:size});

    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {                       // Prices will update, if we change items. add to carts
        setSize(priceRef.current.value);
    })

    return (
        <div>
            <div className="card mt-3" style={{ "width": "20rem", "maxheight": "50px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..."  style={{height:"120px", objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>

                        <select className="m-2 h-100 bg-success" onChange = {(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>     {/* This select option is for selecting quantity */}

                        <select className="m-2 h-100 bg-success rounded=True" onChange = {(e) => setSize(e.target.value)}>
                            {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>      {/* This select option is for selecting Half/Full */}

                        <div className="d-inline h-100 fs-6">
                            Rs.{finalPrice} /-                            
                        </div>
                    <div>
                        <hr>
                        </hr>
                        <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}> Add to Cart </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
