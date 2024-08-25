import React from "react";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import step1 from '../assets/step1.png'
import step2 from '../assets/step2.webp'
import step3 from '../assets/step3.jfif'
import MediaCard from "../components/Card";

const HomePage = () => {

  console.log("Current User Data " , useSelector((state) => state.auth.user_data))
  console.log("Current User Auth " , useSelector((state) => state.auth.is_authenticated))


  return (
<div className="bg-gray-900 text-white flex-grow flex flex-col">
  <section className="bg-gradient-to-r from-black to-purple-700 text-white py-20 flex-grow flex items-center justify-center">
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-white py-8">
        Welcome to AI LinkedIn About Writer
      </h1>
      <p className="mt-2 mb-2 text-lg sm:text-xl text-blue-100">
        Automatically generate a compelling LinkedIn About section that
        truly represents you.
      </p>
      <Link
        to={'/generate_about_me'}
        className="mt-3 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow hover:bg-blue-200"
      >
        Get Started
      </Link>
    </div>
  </section>

  <section className="py-12 bg-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-300">How It Works</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
        <MediaCard img={step1} title="Step 1" content="Enter your LinkedIn profile URL" />
        <MediaCard img={step2} title="Step 2" content="Our AI analyzes your profile details." />
        <MediaCard img={step3} title="Step 3" content="Receive an updated and personalized About section" />
      </div>
    </div>
  </section>
</div>

  );
};

export default HomePage;
