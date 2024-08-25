import React from 'react'
import Typewriter from './Typewriter';

const Loader = () => {
  return (
    <div className="loader-container">
    <Typewriter wordss={["Collecting data", "Analyzing profile", "Crafting response"]} />
    </div>
  );
};

export default Loader;
