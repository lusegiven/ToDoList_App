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
      const response = await axiosInstance.post("https://to-do-list-app-server-lusegivens-projects.vercel.app/login", {
        email: email,
        password: password,
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/home");
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
      className="flex items-center justify-center bg-center min-h-screen"
      style={{
        background: 'linear-gradient(90deg, #D7DDE8 0%, #757F9A 100%)',
      }}
    >
      <div className= "bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 rounded-lg p-20 w-full max-w-lg text-whites ">
          <form onSubmit={handleLogin} className="space-y-8">
            <h4 className='text-3xl font-semibold text-center'>Login</h4>

            <div className="relative border-b-2 border-gray-300 focus-within:border-white w-full">
            <input
              type="text"
              required
              className="w-full bg-transparent outline-none text-white placeholder-black peer "
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 font-bold-custom text-s pb-1'>{error}</p>}

            <button type='submit' className='w-full bg-white bg-opacity-20 py-3 rounded-lg text-link font-semibold hover:bg-opacity-30 transition'>Login</button>

            <p className='text-sm text-center mt-4'>
              Not Registered yet?{" "} <br />
              <Link to="/signup" className='font-bold-custom text-link underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>  
  </>
}

export default Login
