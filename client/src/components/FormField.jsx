import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => (
  
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-900" 
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            className="font-semibold text-[#6469ff] text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px]"
            onClick={handleSurpriseMe}>Surprise me</button>
        )}
      </div>
      <input 
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='py-2 px-1 shadow-sm text-sm border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] block w-full outline-none'
        />
    </div>
);


export default FormField;