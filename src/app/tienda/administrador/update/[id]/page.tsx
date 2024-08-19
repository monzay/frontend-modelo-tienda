"use client";
import { ContextoProductos } from "@/app/Providers/ProviderProductos";
import React, { useState, ChangeEvent, useContext } from "react";
import { updateProducto } from "./func/update";




const Page: React.FC<{ params: { id: number } }> = ({ params }) => {


  const { productos } = useContext(ContextoProductos);
  const [productoData, setProductoData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  })
  const [error, setError] = useState<string>("");


  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductoData((prev) => ({ ...prev, [name]: value }));
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <form onSubmit={(e)=> updateProducto(
        `http://localhost:4000/api/products/update/${params.id}`,
        productos,
        productoData,
        setError,
        params,
        e)}>

        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Actualizar Producto
        </h2>
        <p className="mb-6 text-gray-600">
        Cambia el campo que quieras modificar
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
        
        {/* Campo para el precio del producto */}
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
        
        {/* Campo para el stock del producto */}
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
        
        {/* Campo para la descripción del producto */}
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

        {/* Muestra mensajes de error si los hay */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default Page;
