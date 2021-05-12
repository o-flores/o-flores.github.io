import React from 'react';
import '../styles/header.css';
import { Link as a } from 'react-router-dom'
import { FaRegNewspaper } from 'react-icons/fa'

function Header() {
  return (
    <header>
      <div className='header-container'>
        <div className='logo'>
          <a href='/'><FaRegNewspaper /></a>
        </div>
        <h1 className='title'>News</h1>
      </div>
    </header>
  )
}

export default Header;