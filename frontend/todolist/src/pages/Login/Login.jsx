import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import backgroundImage from '../../assets/bg2.jpg';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

     setError("");

     //login api call
     try{
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/");
      }
     } catch(error){
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occured. please try again!");
        }
     }
  };

  return <>
    <div
      className="flex items-center justify-center bg-cover bg-center min-h-screen animation-zoom-in"
      style={{ backgroundImage: `url(${backgroundImage})`, overflow: 'hidden' }}
    >
      <div className='flex items-center justify-center mt-0'>
        <div className='w-80 border rounded bg-white px-7 py-10 ml-10 mr-4'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>

            <input type='text' 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 font-bold-custom text-s pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>Login</button>

            <p className='text-sm text-center mt-4'>
              Not Registered yet?{" "} <br />
              <Link to="/signup" className='font-bold-custom text-link underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </>;
}

export default Login
