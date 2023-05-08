import React from 'react'
import { auth } from '../../firebase'
import "./row.css"

const Row = ({ Icon, title, logout }) => {


  const handleClick = () => {
    if (logout) {
      auth.signOut()
    }
  };

  return (
    <div className='row' onClick={handleClick}>
        <Icon  className="nav__icon"/>
        <small>{title}</small>
    </div>
  )
}

export default Row