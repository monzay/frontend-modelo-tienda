"use client"
import React, { createContext, useState, ReactNode, SetStateAction,useEffect } from 'react';
import {TypeCarrito } from '../typo/interfaces';
import { cookies } from 'next/headers';


interface ContextoProductoType {
  productos: TypeCarrito[];
  setProductos: React.Dispatch<SetStateAction<TypeCarrito[]>>
  setCarrito:  React.Dispatch<SetStateAction<TypeCarrito[]>>
  carrito:TypeCarrito[]
}

interface ProviderProductosProps {
  children: ReactNode;
}


export const ContextoProductos = createContext<ContextoProductoType>({
  productos: [],
  setProductos: () => {},
  setCarrito: () => {},
  carrito:[]
});


export const ProviderProductos: React.FC<ProviderProductosProps> = ({ children }) => {

  const [productos, setProductos] = useState([]);
  const [carrito,setCarrito] = useState([])

   /////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const obtenerProductos = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const respuesta = await fetch('http://localhost:4000/api/products/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!respuesta.ok) {
          throw new Error('Error al obtener los productos');
        }
        const datos = await respuesta.json();
        setProductos(datos)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerProductos();
  }, []);
   /////////////////////////////////////////////////////////////////////////////////////
  

  return (
    <ContextoProductos.Provider value={{ productos, setProductos,carrito,setCarrito }}>
      {children}
    </ContextoProductos.Provider>
  );
};