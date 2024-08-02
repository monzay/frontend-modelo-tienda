"use client";
import { ContextoProductos } from "@/app/Providers/ProviderProductos";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { decodeToken,JwtPayload } from "@/dataTypes";
import { Rum_Raisin, Ruthie } from "next/font/google";
const Page: React.FC = () => {
  const [productoData, setProductoData] = useState({
   //file: null as File | null,
    name: "",
    description: "",
    price: "",
    stock: ""
  });
  
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProductoData((prev) => ({ ...prev, file: event.target.files![0] }));
    }
  };

  const handleInputChange = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductoData((prev) => ({ ...prev, [name]: value }));
  };
  
  async function enviarProducto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (
    //  !productoData.name || !productoData.file ||
      !productoData.description ||
      !productoData.price ||
      !productoData.stock
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const producto = {
      name:productoData.name,
      description: productoData.description,
      price: parseInt(productoData.price),
      stock: parseInt(productoData.stock)
    }

  // convertimos el objeto 
  //  const formData = new FormData();
  //  formData.append("file", productoData.file);
  //  formData.append("name", productoData.name);
  //  formData.append("description", productoData.description);
  //
  // formData.append("price", productoData.price);
  //  formData.append("stock", productoData.stock);

    const token = localStorage.getItem('access_token');
    
    try {
      const respuesta = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      const data =  await respuesta.json()
      if (!respuesta.ok) {
        console.log(data)
       return 
      }
      setError("Producto creado con exito");
      return
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setError("Error al enviar el producto");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white  rounded-lg">
      <form onSubmit={enviarProducto}>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Administración
        </h2>
        <p className="mb-6 text-gray-600">
          Solo tienes acceso para agregar, eliminar y actualizar productos
        </p>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nombre del producto"
            onChange={handleInputChange}
            value={productoData.name}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Precio"
            onChange={handleInputChange}
            value={productoData.price}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="stock"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Cantidad en stock"
            onChange={handleInputChange}
            value={productoData.stock}
          />
        </div>
        <div className="mb-6">
          <textarea
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            placeholder="Descripción del producto"
            onChange={handleInputChange}
            value={productoData.description}
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg text-center p-5 text-gray-600 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm">
              <span className="font-semibold">Haz clic para subir</span>
            </p>
          </label>
          <input
            className="hidden"
            id="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        {/* productoData.file && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p className="text-green-700">
              Archivo seleccionado:{" "}
              <span className="font-semibold">{productoData.file.name}</span>
            </p>
          </div>
        )*/}

        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enviar Producto
        </button>
      </form>
    </div>
  );
};

export default Page;
