import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput = ({ value, onChange, placeholder }) => {

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative border-b-2 border-gray-300 focus-within:border-white">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full bg-transparent outline-none text-white placeholder-black peer"
      />
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        {isShowPassword ? (
          <FaRegEye
            size={24}
            className="text-link cursor-pointer"
            onClick={toggleShowPassword}
          />
        ) : (
          <FaRegEyeSlash
            size={24}
            className="text-link cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput
