"use client";
import { ContextoProductos } from "@/app/Providers/ProviderProductos";
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";

/**
 * Componente de página para actualizar un producto.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.params - Parámetros de la ruta.
 * @param {number} props.params.id - ID del producto a actualizar.
 */
const Page: React.FC<{ params: { id: number } }> = ({ params }) => {
  
  // Obtiene los productos y la función para actualizarlos del contexto
  const { productos, setProductos } = useContext(ContextoProductos);
  
  // Estado para almacenar los datos del producto a actualizar
  const [productoData, setProductoData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  // Estado para manejar mensajes de error
  const [error, setError] = useState<string>("");

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Evento de cambio.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductoData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Función asíncrona para actualizar el producto.
   * @param {FormEvent<HTMLFormElement>} event - Evento de envío del formulario.
   */
  async function clickActualizarProducto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem('access_token');
  
    // Busca el producto a actualizar
    const productoEncontrado = productos.find(producto => producto.id == params.id);
    if (!productoEncontrado) {
      setError("Producto no encontrado");
      return;
    }

    // Prepara los nuevos datos del producto
    const nuevosDatosProductos = {
      name: productoData.name || productoEncontrado.name,
      description: productoData.description || productoEncontrado.description,
      price: productoData.price ? parseFloat(productoData.price) : productoEncontrado.price,
      stock: productoData.stock ? parseInt(productoData.stock) : productoEncontrado.stock
    };

    try {
      // Realiza la petición para actualizar el producto
      const respuesta = await fetch(`http://localhost:4000/api/products/update/${params.id}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevosDatosProductos)
      });
      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar el producto');
      }
      setError("Producto actualizado con éxito");
    } catch (error) {
      console.log(error)
    }  
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <form onSubmit={clickActualizarProducto}>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Actualizar Producto
        </h2>
        <p className="mb-6 text-gray-600">
        Cambia el campo que quieras modificar
        </p>

        {/* Campo para el nombre del producto */}
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
