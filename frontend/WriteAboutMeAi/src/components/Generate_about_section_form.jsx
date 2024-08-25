import axios from 'axios'
import React, { useState, useEffect, useRef , useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Generate_about_section_form() {
    const [res, set_res] = useState(null)
    const [loader, set_loader] = useState(false)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            LinkedIn_url: "",
            writing_style: "",
            keywords_include: "",
            keywords_exclude: "",
        }
    })
    const navigate = useNavigate()
    
    const status = useSelector(state => state.auth.is_authenticated);
    console.log("s" , status);
    
    useEffect(() => {
        if (!status && status!==null) navigate('/login');
    }, [status, navigate]);

    const submit = async (data) => {
        set_loader(true)
        axios.post('/api/v1/users/generate_about_section', {
            LinkedIn_url: data.LinkedIn_url,
            writing_style: data.writing_style,
            keywords_include: data.keywords_include,
            keywords_exclude: data.keywords_exclude,
        })
            .then((response) => {
                console.log("About me : ", response);
                set_loader(false)
                set_res(response.data.data)
            })
            .catch((error) => {
                console.log("error in about me frontend : ", error);
            })
    }

    
    console.log("ty" , res?.length);

    const res_ref = useRef()

    const copy = useCallback(()=>{
        const textToCopy = res; // The text you want to copy

        // Create a temporary textarea element
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
      
        // Add the textarea to the document, select its content, and copy it
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textToCopy.length);
      
        // Copy the selected text
        document.execCommand("copy");
      
        // Remove the textarea from the document
        document.body.removeChild(textarea);
      
        alert("Copied to clipboard!");
    }, [res])

    return (
<div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-black text-white flex items-center justify-center py-16">
  {loader && (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <Loader />
    </div>
  )}
  <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-5xl mx-4 flex flex-col md:flex-row">
    {/* Left Side (Form) */}
    <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Generate Your LinkedIn 'About' Section</h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">LinkedIn URL</label>
          <input
            type="text"
            placeholder="Enter your LinkedIn URL"
            {...register('LinkedIn_url', { required: true })}
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Choose Writing Style</label>
          <input
            type="text"
            placeholder="Professional / Casual / Creative"
            {...register('writing_style', { required: false })}
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Keywords to Include</label>
          <input
            type="text"
            placeholder="Keywords to include"
            {...register('keywords_include', { required: false })}
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Keywords to Exclude</label>
          <input
            type="text"
            placeholder="Keywords to exclude"
            {...register('keywords_exclude', { required: false })}
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold transition duration-300"
        >
          Generate
        </button>
      </form>
    </div>

    {/* Right Side (Generated Section) */}
    {res && (
      <div className="w-full md:w-1/2 md:pl-8">
        <div className="bg-gray-700 p-6 rounded-md">
          <button
            onClick={copy}
            className="outline-none bg-white text-black font-bold px-3 py-0.5 cursor-pointer rounded-lg mb-4"
          >
            Copy
          </button>
          <p ref={res_ref} className="whitespace-pre-line">{res}</p>
        </div>
      </div>
    )}
  </div>
</div>

    );
}

export default Generate_about_section_form;


