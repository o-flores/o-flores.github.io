import React from 'react';
import '../styles/header.css';
import { FaRegNewspaper, FaLinkedin, FaGithub } from 'react-icons/fa';

function Header() {
  return (
    <header>
      <a className='logo' href='/'><FaRegNewspaper /></a>
      <h1 className='title'>News</h1>
      <div className="media">
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.linkedin.com/in/orlandoflores95/'>
          <FaLinkedin />
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/o-flores'>
          <FaGithub />
        </a>
      </div>
    </header>
  )
}

export default Header;