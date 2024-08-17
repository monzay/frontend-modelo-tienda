"use client"
import React, { createContext, useState, ReactNode, SetStateAction, useEffect } from 'react';
import { TypeCarrito } from '../typo/interfaces';

/**
 * Interfaz que define la estructura del contexto de productos.
 * @interface ContextoProductoType
 * @property {TypeCarrito[]} productos - Array de productos.
 * @property {React.Dispatch<SetStateAction<TypeCarrito[]>>} setProductos - Función para actualizar los productos.
 * @property {React.Dispatch<SetStateAction<TypeCarrito[]>>} setCarrito - Función para actualizar el carrito.
 * @property {TypeCarrito[]} carrito - Array de productos en el carrito.
 */
interface ContextoProductoType {
  productos: TypeCarrito[];
  setProductos: React.Dispatch<SetStateAction<TypeCarrito[]>>
  setCarrito: React.Dispatch<SetStateAction<TypeCarrito[]>>
  carrito: TypeCarrito[]
}

/**
 * Interfaz para las propiedades del componente ProviderProductos.
 * @interface ProviderProductosProps
 * @property {ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 */
interface ProviderProductosProps {
  children: ReactNode;
}

/**
 * Contexto para manejar los productos y el carrito en la aplicación.
 * @constant ContextoProductos
 */
export const ContextoProductos = createContext<ContextoProductoType>({
  productos: [],
  setProductos: () => {},
  setCarrito: () => {},
  carrito: []
});

/**
 * Componente proveedor para el contexto de productos.
 * @function ProviderProductos
 * @param {ProviderProductosProps} props - Propiedades del componente.
 * @returns {JSX.Element} Proveedor de contexto con sus hijos.
 */
export const ProviderProductos: React.FC<ProviderProductosProps> = ({ children }) => {
  // Estados para manejar los productos y el carrito
  const [productos, setProductos] = useState<TypeCarrito[]>([]);
  const [carrito, setCarrito] = useState<TypeCarrito[]>([]);

  /**
   * Efecto para obtener los productos al cargar el componente.
   */
  useEffect(() => {
    const obtenerProductos = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const respuesta = await fetch('http://localhost:4000/api/products', {
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
        setProductos(datos);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <ContextoProductos.Provider value={{ productos, setProductos, carrito, setCarrito }}>
      {children}
    </ContextoProductos.Provider>
  );
};
