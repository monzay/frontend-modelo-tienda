"use client "
import { createContext, useState } from "react";
export const ContextoHeaderLateralCelular = createContext<any>(null);
export const ProviderBoolHeaderLateralCelular  = ({ children } :any) => {
    const [mostrarHeaderLateralCelular,setMostrarHeaderLateralCelular] = useState(false)
  return (
    <ContextoHeaderLateralCelular.Provider value={{mostrarHeaderLateralCelular, setMostrarHeaderLateralCelular}}>
      {children}
    </ContextoHeaderLateralCelular.Provider>
  );
};