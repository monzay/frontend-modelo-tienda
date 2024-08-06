"use client"
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { decodeToken, JwtPayload } from '@/dataTypes';

/**
 * Interfaz que define la estructura del contexto de acceso.
 * @interface ContextoAccesoType
 * @property {boolean} acceso - Indica si el usuario tiene acceso de administrador.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setAcceso - Función para actualizar el estado de acceso.
 */
interface ContextoAccesoType {
  acceso: boolean;
  setAcceso: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Crea un contexto para manejar el acceso de administrador en la aplicación.
 * @constant ContextoAcceso
 */
export const ContextoAcceso = createContext<ContextoAccesoType | null>(null);

/**
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 */

export const ProviderAcceso: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para manejar el acceso de administrador
  const [acceso, setAcceso] = useState<boolean>(true);
  // Efecto para verificar el token de acceso al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = decodeToken<JwtPayload>(token);
      if (decodedToken.role === "ADMIN") {
        setAcceso(true);
      }
    }
  }, []);
  
  return (
    //estamos mandamos los valores a todos los hijos 
    <ContextoAcceso.Provider value={{acceso, setAcceso}}>
      {children}
    </ContextoAcceso.Provider>
  );
};