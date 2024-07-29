"use client"

import React, { useState, ChangeEvent } from 'react'
import { ContextoProductos } from '../../Providers/ProviderProductos';

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [nombreProducto,setNombreProducto] = useState<string>("")
  const [descripciónProducto,setDescripcioProducto] = useState<string>("")

  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  

  const handleNombre = (event: ChangeEvent<HTMLInputElement>)  =>{
    setNombreProducto(event.target.value)
}
const handleDescripcion  = (event: ChangeEvent<HTMLTextAreaElement>)  =>{
    setDescripcioProducto(event.target.value)
    console.log(descripciónProducto)
}



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Administración</h2>
      <p className="mb-6 text-gray-600">
        Solo tienes acceso para agregar, eliminar y actualizar productos
      </p>
      
      <div className="mb-4">
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Ingrese texto aquí"
          onChange={handleNombre}
        />
      </div>
      
      <div className="mb-6">
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Ingrese descripción aquí"
          onChange={handleDescripcion}
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label 
          htmlFor="file" 
          className="flex flex-col justify-center items-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg text-center p-5 text-gray-600 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="mb-2 text-sm">
            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
          </p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF (MAX. 800x400px)</p>
        </label>
        <input 
          className="hidden"
          id="file" 
          type="file" 
          onChange={handleFileChange}
        />
      </div>
      
      {file && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700">
            Archivo seleccionado: <span className="font-semibold">{file.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Page