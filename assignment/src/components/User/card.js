// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatchCart, useCart } from './ContextReducer';

// export default function Card(props) {
//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState('');
//   const [initialSizeSet, setInitialSizeSet] = useState(false); // New state to track if initial size is set

//   const dispatch = useDispatchCart();
//   const data = useCart();
//   const navigate = useNavigate();
//   const priceRef = useRef();
//   const options = props.options || {};
//   const priceOptions = Object.keys(options);

//   useEffect(() => {
//     if (priceRef.current && !initialSizeSet) {
//       setSize(priceRef.current.value);
//       setInitialSizeSet(true);
//     }
//   }, [initialSizeSet]); // useEffect will run only once when initialSizeSet changes

//   const handleQtyChange = (e) => {
//     setQty(parseInt(e.target.value));
//   };

//   const handleSizeChange = (e) => {
//     setSize(e.target.value);
//   };

//   const handleClick = () => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   };

//   function increaseQty() {
//     setQty(qty + 1);
//   }

//   function decreaseQty() {
//     if (qty === 0) {
//       return;
//     } else {
//       setQty(qty - 1);
//     }
//   }

//   const handleAddToCart = async () => {
//     // console.log("Adding to cart...");
//     // console.log("Current State:", data);
//     const foods = props.foodName;
//     console.log(foods);
//     console.log(foods);
//     let food = [];

//     for (const item of data) {
//       if (item.id === props._id) {
//         food = item;
//         break;
//       }
//     }
//     console.log(food);

//     if (food) {
//       console.log("bska");
//       console.log(food.size);
//       if (food.size === size) {
//         console.log("nkcacjvs");
//         await dispatch({ type: 'UPDATE', id: props._id, price: finalPrice, qty: qty });
//         return;
//       } else {
//         await dispatch({ type: 'ADD', id: props._id, name: props.name, price: finalPrice, qty: qty, size: size });
//         return;
//       }
//     } else {
//       await dispatch({ type: 'ADD', id: props._id, name: props.name, price: finalPrice, qty: qty, size: size });
//     }
//     await dispatch({ type: "ADD", id: props.foodName._id, name: props.foodItem.name, price: props.finalPrice, qty: qty, size: size});
//     await console.log(data)
//   };

//   const finalPrice = qty * parseInt(options[size] || 0);

//   return (
//     <div>
//       <div className="card mt-3 rounded" style={{ width: '20rem', maxHeight: '50rem',borderRadius: '50px' }}>
//         <img src={props.ImgSrc} className="card-img-top" alt="Not visible" style={{ height: '180px', objectFit: 'fill'  }} />
//         <div className="card-body">
//           <h5 className="card-title">{props.foodName}</h5>
//           <div className="container w-100">
//             <button className="m-2 h-50 bg-success rounded" style={{ height: '5px', width: '20px' }} onClick={decreaseQty}>-</button>
//             <div className="d-inline h-100 fs-6">{qty}</div>
//             <button className="m-2 h-50 bg-success rounded = True" onClick={increaseQty}>+</button>
//             <select ref={priceRef} className="m-2 h-100 bg-success rounded = True" value={size} onChange={handleSizeChange}>
//               {priceOptions.map((data) => (
//                 <option key={data} value={data}>
//                   {data}
//                 </option>
//               ))}
//             </select>
//             <div className="d-inline h-100 fs-6"> Rs.{finalPrice} /- </div>
//             <div>
//               <hr />
//               <button className="btn btn-success justify-center ms-2 " onClick={handleAddToCart}>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    console.log("foodItem:", foodItem);
    console.log("data:", data);
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  // let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  let finalPrice = qty * parseInt(options[size] || 0, 10);
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
