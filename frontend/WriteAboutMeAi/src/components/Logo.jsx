import React from 'react';
import logo_image from '../assets/AboutMe.Ai.png'
import { Link } from 'react-router-dom';

function Logo({
  width = '175px',
  image =  logo_image ,
}) {
  return (
    <Link to={'/'}>
    <img 
      src={image} 
      alt="Logo" 
      style={{ width }} 
      className="block object-contain"
    />
    </Link>
  );
}

export default Logo;
