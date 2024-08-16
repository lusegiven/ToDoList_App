import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo, onSearchTodo,handleClearSearch}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const onLogOut = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchTodo(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className=" bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar 
        value={searchQuery}
        onChange={({target}) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogOut={onLogOut}/>
    </div>
  );
}

export default Navbar
