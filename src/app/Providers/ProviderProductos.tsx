"use client"
import React, { createContext, useState, ReactNode, SetStateAction, useEffect } from 'react';
import { TypeCarrito } from '../typo/interfaces';
import { feach } from '@/components/cardProducto/func/feach';

interface ContextoProductoType {
  productos: TypeCarrito[];
  setProductos: React.Dispatch<SetStateAction<TypeCarrito[]>>
  setCarrito: React.Dispatch<SetStateAction<TypeCarrito[]>>
  carrito: TypeCarrito[]
}

interface ProviderProductosProps {
  children: ReactNode;
}


export const ContextoProductos = createContext<ContextoProductoType>({
  productos: [],
  setProductos: () => {},
  setCarrito: () => {},
  carrito: []
});


export const ProviderProductos: React.FC<ProviderProductosProps> = ({ children }) => {

  const [productos, setProductos] = useState<TypeCarrito[]>([]);
  const [carrito, setCarrito] = useState<TypeCarrito[]>([]);


  useEffect(() => {
    const obtenerProductos = async () => {
      const datos = await feach("http://localhost:4000/api/products/all", 'GET');
      if (datos) {
        setProductos(datos);
      }
    };
    obtenerProductos();
  }, [productos]);




  return (
    <ContextoProductos.Provider value={{ productos, setProductos, carrito, setCarrito }}>
      {children}
    </ContextoProductos.Provider>
  );
};
