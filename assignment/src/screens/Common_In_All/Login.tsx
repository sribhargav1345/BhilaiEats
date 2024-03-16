
import React from 'react';
import COVER_IMAGE from '../../Assests/images/cover_image.jpg';

const colors = {
    primary: "#060606",
    background: "#f5f5f5",
    disabled: "#D9D9D9"
}

const Login = () => {
    return (
        <div className="w-full min-h-screen d-flex items-start">
          <div className="relative w-1/2 h-full flex flex-col">
            <div className='absolute top-[20%] left-[10%] flex flex-col'>
              <h1 className='text-2x1 text-white font-bold'> Turn Your Ideas into Reality </h1>
              <p className='text-xl text-white font-normal'> Start for free and get attractive offers from the community </p>
            </div>
            <img src={COVER_IMAGE} className="w-full h-full object-cover" />
          </div>
      
          <div className='w-full h-full bg-[#f5f5f5] flex flex-col p-14'>
            <h1 className='text-xl text-[#060606] font-semibold'> Interactive Brand </h1>
      
            <div className='w-full flex flex-col'>
              <div className='w-full flex flex-col mb-10'>
                <h3 className='text-2xl font-semibold mb4'> Login </h3>
                <p className='text-sm mb-2'> Welcome Back! Please enter your details </p>
              </div>
      
              <div className='w-full flex flex-col'>
                <input 
                  type="email"
                  className='w-full text-black py-4 border-b border-black outline-none focus:outline-none'
                  placeholder='Email'
                />
              </div>
            </div>
      
            <div className='w-full flex items-center justify-center'>
              <p className='text-sm font-normal text-[#060606]'> Don't have an account? <span className='font-semibold underline underline-offset-2'>  <a href="#">Signup for free</a> </span> </p>
            </div>
          </div>
        </div>
      ) 
}

export default Login;