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
      <section className="bg-blue-800 text-white py-20 flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-200">
            Welcome to AI LinkedIn About Writer
          </h1>
          <p className="mt-4 text-xl text-blue-100">
            Automatically generate a compelling LinkedIn About section that
            truly represents you.
          </p>
          <Link
            to={'/generate_about_me'}
            className="mt-6 inline-block bg-blue-300 text-gray-900 font-semibold py-3 px-6 rounded shadow hover:bg-blue-200"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl font-bold text-blue-300">How It Works</h2>
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
      {/* <div className="p-6 bg-gray-700 shadow-lg rounded-lg">
        <img
          src={step1}
          alt="Step 1"
          className="h-24 w-24 mx-auto mb-4 hover:scale-105 transition-transform duration-200"
        />
        <h3 className="mt-4 text-lg font-semibold text-blue-200">
          Step 1
        </h3>
        <p className="mt-2 text-blue-100">
          Enter your LinkedIn profile URL.
        </p>
      </div> */}
      <MediaCard img={step1} title="Step 1" content= "Enter your LinkedIn profile URL"/>
      <MediaCard img={step2} title="Step 2" content= "Our AI analyzes your profile details."/>
      <MediaCard img={step3} title="Step 3" content= "Receive an updated and personalized About section"/>
      {/* <div className="p-6 bg-gray-700 shadow-lg rounded-lg">
        <img
          src={step2}
          alt="Step 2"
          className="h-24 w-24 mx-auto mb-4 hover:scale-105 transition-transform duration-200"
        />
        <h3 className="mt-4 text-lg font-semibold text-blue-200">
          Step 2
        </h3>
        <p className="mt-2 text-blue-100">
          Our AI analyzes your profile details.
        </p>
      </div> */}
      {/* <div className="p-6 bg-gray-700 shadow-lg rounded-lg">
        <img
          src={step3}
          alt="Step 3"
          className="h-24 w-24 mx-auto mb-4 hover:scale-105 transition-transform duration-200"
        />
        <h3 className="mt-4 text-lg font-semibold text-blue-200">
          Step 3
        </h3>
        <p className="mt-2 text-blue-100">
          Receive an updated and personalized About section.
        </p>
      </div> */}
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;
