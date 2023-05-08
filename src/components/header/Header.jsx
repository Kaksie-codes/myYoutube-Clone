import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MicIcon from '@mui/icons-material/Mic';
import youtubeLogo from '../../assets/youtube__logo.png'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Image from '../../assets/nsikak.jpg'
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import './header.css'

const Header = ({handleToggleSidebar}) => {
    const [inputSearch, setInputSearch] = useState("");
    const navigate = useNavigate();
    const { photoURL } = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${inputSearch}`)
    }

    const handleChange = (e) => {
        if(e.keyCode === 13){
            handleSubmit()
        }else{
            setInputSearch(e.target.value)
        }        
    }

  return (
    <header>
        <div className="container header__container">
            <div className="nav__left">
                <MenuIcon onClick={handleToggleSidebar}/>
                <Link to="/">
                    <div className="logo">
                        <img src={youtubeLogo} alt=" youtube logo" />
                    </div>
                </Link>              
            </div>
            <div className="nav__middle">
                <form className="search__box" onSubmit={handleSubmit}>
                    <input type="text" 
                        placeholder='Search'
                        value={inputSearch}
                        onChange={handleChange}
                    />                    
                    <button className="search__input-btn">
                        <SearchIcon /> 
                    </button>                    
                </form>
                <MicIcon className='nav__icon'/>
            </div> 
            <div className="nav__right">
                <VideoCallOutlinedIcon className="icon"/>
                <NotificationsNoneIcon className="icon"/>               
                <Avatar src={photoURL} sx={{ width: 30, height: 30 }}/>
            </div>
        </div>
    </header>
  )
}

export default Header;