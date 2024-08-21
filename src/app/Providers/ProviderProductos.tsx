"use client"
import React, { createContext, useState, ReactNode, SetStateAction, useEffect } from 'react';
import { TypeCarrito } from '../typo/interfaces';
import { feach } from '@/components/cardProducto/func/feach';

interface ContextoProductoType {
  productos:  any
  setProductos: any
  setCarrito: any
  carrito:  any
}


export const ContextoProductos = createContext<ContextoProductoType>({
  productos: [],
  setProductos: () => {},
  setCarrito: () => {},
  carrito: []
});

export const ProviderProductos = ({ children } : any) => {
  const [productos, setProductos] = useState<TypeCarrito[]>([]);
  const [carrito, setCarrito] = useState<TypeCarrito[]>([]);

  
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    } else {
      localStorage.setItem("carrito", JSON.stringify([]));
    }
  }, []);
   
  useEffect(() => {
    const carritoExitente = localStorage.getItem("carrito")
    if(carritoExitente){
      if(carrito.length > 0){
        localStorage.setItem("carrito",JSON.stringify(carrito))
      }
    }
  }, [carrito])




 
  useEffect(() => {
    const obtenerProductos = async () => {
      const datos = await feach("http://localhost:4000/api/products/all", 'GET');
      // Si se obtienen datos, se imprimen en la consola y se actualiza el estado 'productos'
      if (datos) {
        setProductos(datos);
      }
    };
    // Si el arreglo 'productos' está vacío, se llama a la función 'obtenerProductos'
    if (!productos.length) {
      obtenerProductos();
    }
  }, [productos]);


  return (
    <ContextoProductos.Provider value={{ productos, setProductos, carrito, setCarrito }}>
      {children}
    </ContextoProductos.Provider>
  );
};
