import React from 'react';
import '../styles/header.css'
import { FaRegNewspaper } from 'react-icons/fa'

function Header() {
  return (
    <header>
      <div className='header-container'>
        <div className='logo'>
          <FaRegNewspaper />
        </div>
        <h1 className='title'>News</h1>
      </div>
    </header>
  )
}

export default Header;