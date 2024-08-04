"use client"
import React, { createContext, useState, ReactNode ,useEffect} from 'react';
import { decodeToken,JwtPayload } from '@/dataTypes';
import { tree } from 'next/dist/build/templates/app-page';
interface ContextoAccesoType {
  acceso: boolean;
  setAcceso: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextoAcceso = createContext<ContextoAccesoType | null>(null);

export const ProviderAcceso: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [acceso, setAcceso] = useState<boolean>(true);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = decodeToken<JwtPayload>(token);
      if(decodedToken.role === "ADMIN" ){
        setAcceso(true)
      }
    }
  }, []);
  
  return (
    <ContextoAcceso.Provider value={{acceso, setAcceso}}>
      {children}
    </ContextoAcceso.Provider>
  );
};