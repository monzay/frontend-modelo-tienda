"use client"
import React, { createContext, useState, ReactNode, SetStateAction,useEffect } from 'react';
import { ApiProducto, TypeCarrito } from '../typo/interfaces';


interface ContextoProductoType {
  productos: TypeCarrito[];
  setProductos: React.Dispatch<SetStateAction<TypeCarrito[]>>
  setCarrito:  React.Dispatch<SetStateAction<TypeCarrito[]>>
  carrito:TypeCarrito[]
  productosComprados:TypeCarrito[]
}

interface ProviderProductosProps {
  children: ReactNode;
}

  // data de la base de datos 
const productosCompradoUsuario : TypeCarrito[]= []
const infoUsuario = [] 
const apiProductos: ApiProducto[] = [
  {
    id: 1,
    nombre: 'Teclado',
    precio: 25.99
  },
  {
    id: 2,
    nombre: 'Ratón',
    precio: 15.49
  },
  {
    id: 3,
    nombre: 'Monitor',
    precio: 199.99
  },
  {
    id: 4,
    nombre: 'Impresora',
    precio: 89.99
  },
  {
    id: 5,
    nombre: 'Auriculares',
    precio: 45.99
  },
  {
    id: 6,
    nombre: 'Micrófono',
    precio: 60.00
  },
  {
    id: 7,
    nombre: 'Cámara web',
    precio: 39.99
  },
  {
    id: 8,
    nombre: 'Altavoces',
    precio: 30.00
  },
  {
    id: 9,
    nombre: 'Disco duro externo',
    precio: 75.50
  },
  {
    id: 10,
    nombre: 'Tarjeta gráfica',
    precio: 299.99
  }
];

export const ContextoProductos = createContext<ContextoProductoType>({
  productos: [],
  setProductos: () => {},
  setCarrito: () => {},
  carrito:[],
  productosComprados:[]
});


 /////////////////////////////////////////////////////////////////////////////////////
export const ProviderProductos: React.FC<ProviderProductosProps> = ({ children }) => {
  
  const [productos, setProductos] = useState<TypeCarrito[]>([]);
  const [carrito,setCarrito] = useState<TypeCarrito[]>([])
  const [productosComprados,setProductosComprados] = useState<TypeCarrito[]>([])


   /////////////////////////////////////////////////////////////////////////////////////

   
  //  carga la productos de la base de datos
  useEffect(() => {
    setProductosComprados(apiProductos)
    setProductos(apiProductos)
  }, [])
  
   /////////////////////////////////////////////////////////////////////////////////////
  

  return (
    <ContextoProductos.Provider value={{ productos, setProductos,carrito,setCarrito,productosComprados }}>
      {children}
    </ContextoProductos.Provider>
  );
};