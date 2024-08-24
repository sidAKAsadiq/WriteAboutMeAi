import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function Generate_about_section_form() {
    const [res,set_res] = useState(null)
    const {register , handleSubmit} = useForm({
        defaultValues:{
            LinkedIn_url : "",
            writing_style : "",
            keywords_include : "",
            keywords_exclude : "",
        }
    })


   const submit = async(data) => {
    axios.post('/api/v1/users/generate_about_section' , {
        LinkedIn_url : data.LinkedIn_url,
        writing_style : data.writing_style,
        keywords_include : data.keywords_include,
        keywords_exclude : data.keywords_exclude,
    })
    .then((response) => {
        console.log("About me : ", response);
        set_res(response.data.data)
    })
    .catch((error) => {
        console.log("error in about me frontend : ", error );  
    })
   } 


   return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Let the magic begin!</h1>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">LinkedIn URL</label>
            <input
              type="text"
              placeholder="Enter your LinkedIn URL"
              {...register('LinkedIn_url', { required: true })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Choose Writing Style</label>
            <input
              type="text"
              placeholder="Professional / Casual / Creative"
              {...register('writing_style', { required: false })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Keywords to Include</label>
            <input
              type="text"
              placeholder="Keywords to include"
              {...register('keywords_include', { required: false })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Keywords to Exclude</label>
            <input
              type="text"
              placeholder="Keywords to exclude"
              {...register('keywords_exclude', { required: false })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition duration-300"
          >
            Generate
          </button>
        </form>
        {res && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md">
            <p>{res}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Generate_about_section_form