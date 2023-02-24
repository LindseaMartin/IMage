import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt});
  };

  const generateImg = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }; 

  return (
    <section className="max-w-7xl mx-auto">
      <div>
      <h1 className= "font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="text-[#666e75] mt-2 text-[16px] max-w[500px]">Create a collection of visually stunning images through AI!</p>
      </div>
      
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
        <FormField
            labelName="Your name"
            name="name"
            type="text"
            placeholder="Lindsea"
            defaultValue={form.name}
            onChange={handleChange}
         />
           <FormField
            labelName="Prompt"
            name="prompt"
            type="text"
            placeholder="A cat"
            defaultvalue={form.prompt}
            onChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
         />
       
         <div className='relative vg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blye-500 w-64 p-3 h-64 flex justify-center items-center'>
          {form.photo ? (
            <img src={form.photo} alt="preview" className="w-full h-full object-contain" />
          ) : (
            <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-gray-900 bg-opacity-50 rounded-lg">
              <Loader />
              </div>
              )}
         </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-[#6469ff] text-white rounded-lg font-medium text-sm"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-14px'>Once you have created the image you want you can share it with others in the community!</p>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2 bg-[#6469ff] text-white rounded-lg font-medium text-sm"
              >
                {loading ? 'Sharing...' : 'Share with the community'}
              </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
