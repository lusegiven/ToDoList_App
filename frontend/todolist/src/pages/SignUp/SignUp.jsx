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

    if (!name) {
      setError("Please enter your name")
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }
    if (!password) {
      setError("Please set a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("https://todolist-app-oqhf.onrender.com/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }
      if (response.data && response.data.accesstoken) {
        localStorage.setItem("token", response.data.accesstoken)
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. please try again!");
      }
    }
  };


  return (
    <>
      <div
        className="flex items-center justify-center bg-center min-h-screen"
        style={{
          background: 'linear-gradient(90deg, #D7DDE8 0%, #757F9A 100%)',
        }}
      >
        <div className='"bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 rounded-lg p-20 w-full max-w-lg text-whites "'>
          <form onSubmit={handleSignUp} className="space-y-8">
            <h4 className='text-2xl mb-7'>Sign Up</h4>
            <div className="relative border-b-2 border-gray-300 focus-within:border-white w-full space-y-8">
              <input type='text'
                placeholder='Name'
                className="w-full bg-transparent outline-none text-white placeholder-black peer "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            <div className="relative border-b-2 border-gray-300 focus-within:border-white w-full "></div>
              <input type='text'
                placeholder='Email'
                className="w-full bg-transparent outline-none text-white placeholder-black peer "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className='text-red-500 font-bold-custom text-s pb-1'>{error}</p>}

              <button type='submit' className='btn-primary'>Create Account</button>

              <p className='text-sm text-center mt-4'>
                Already have an account?{" "} <br />
                <Link to="/" className='font-bold-custom text-link underline'>
                  Login
                </Link>
              </p>
          </form>
      </div>
    </div >
    </>
  )
}

export default SignUp
