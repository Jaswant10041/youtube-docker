import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import {useLocation,useNavigate} from 'react-router-dom';
import { clearVideos,changeSearchTerm,clearSearchTerm } from "../features/youtube/youtubeSlice";
import { useAppDispatch,useAppSelector } from "../hooks/useApp";
import {getSearchPageVideos} from '../store/reducers/getSearchPageVideos'
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
const Navbar = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const searchTerm=useAppSelector((state)=>state.youtubeApp.searchTerm);
  const handleSearch=()=>{
    if(location.pathname!=='/search') navigate("/search");
    else{
      dispatch(clearVideos);
      dispatch(getSearchPageVideos(false));
    }
  }
  const handleOnclick=()=>{
    <Sidebar/>
  }
  return (
    <div className="flex justify-between items-center px-14 h-14  bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-8 py-3 items-center text-2xl">
        <Link to={`/`}>
        <div>
          <GiHamburgerMenu  onClick={handleOnclick}/>
        </div>
        </Link>
        <div className="flex gap-1 items-center justify-center">
          <BsYoutube className="text-3xl text-rose-600" />
          <span className="text-2xl">YouTube</span>
        </div>
        </div>
        <div className='flex items-center justify-center gap-5'>
            <form onSubmit={(e)=>{
              e.preventDefault();
              handleSearch();
            }}>
                <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl">
                    <div className='flex gap-5 items-center pr-5'>
                        <input 
                        type='text' 
                        placeholder="Search" 
                        className='w-96 bg-zinc-900 
                        focus:outline-none 
                        border-style: none;'
                        value={searchTerm}
                        onChange={e=>dispatch(changeSearchTerm(e.target.value))}
                    />
                    </div>
                    <button className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl">
                        <AiOutlineSearch className='text-xl'/>
                    </button>
                </div>
            </form>
            <div className="text-xl p-3 bg-zinc-800 rounded-full">
              <FaMicrophone/>
            </div> 
            </div>
            
              <div className="flex gap-8 items-center text-xl">
                <RiVideoAddLine />
                <div className="relative">
                <BsBell />
                <span className="absolute bottom-2 left-2 px-1 text-xs rounded-full bg-red-500">9+</span>
                </div>
                <img src='https://static.vecteezy.com/system/resources/previews/022/502/944/original/letter-j-on-shape-round-png.png' alt="accountLogo" className="w-9 h-9 rounded-full"/>
              </div>
            
    </div>
  );
};

export default Navbar;
