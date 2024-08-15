import React, { useState } from 'react'
import backgroundImage from '../../assets/bg1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name")
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please set a password");
      return;
    }

    setError("");

    try{
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if(response.data && response.data.error){
       setError(response.data.message)
       return
      }
      if(response.data && response.data.accesstoken){
        localStorage.setItem("token", response.data.accesstoken)
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


  return (
    <>
      <div
        className="flex items-center justify-center bg-cover bg-center min-h-screen animation-zoom-in"
        style={{ backgroundImage: `url(${backgroundImage})`, overflow: 'hidden' }}
      >
        <div className='flex items-center justify-center mt-0'>
          <div className='w-80 border rounded bg-white px-7 py-10 ml-10 mr-4'>
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl mb-7'>Sign Up</h4>

              <input type='text'
                placeholder='Name'
                className='input-box'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

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

              <button type='submit' className='btn-primary'>Create Account</button>

              <p className='text-sm text-center mt-4'>
                Already have an account?{" "} <br />
                <Link to="/login" className='font-bold-custom text-link underline'>
                  Login
                </Link>
                </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
