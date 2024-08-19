"use client";
import React, { useState ,useEffect} from "react";
import Link from "next/link";
import { ContextoProductos, ProviderProductos } from "../Providers/ProviderProductos";
import "./tienda.css";
import { ProviderAcceso } from "../Providers/ProviderPermisos";
import {rutas} from "./json"
import { decodeToken } from "@/dataTypes";
import { JwtPayload } from "jwt-decode";
import { obtenerToken } from "../funciones";


const layout = ({ children }: { children: React.ReactNode }) => {
  const [administrador, setAdministrador] = useState(false);



 // no entiendo porque me tira un error de typescript 
  useEffect(() => {
   const token = obtenerToken("access_token");
   if(token){
     const decodedToken = decodeToken<JwtPayload>(token); 
     if(decodedToken.role === "SUPERADMIN"){
      setAdministrador(true)
     }
    }
}, [])




  return (
    <div style={{ width: "100%" }}>
      <ProviderAcceso>
        <ProviderProductos>
          <div id="header-vertical" className="bg-muted border-r">
            <nav id="nav-header-vertical" className="flex flex-col">
              {rutas.map((ruta) => {
                if(administrador){
                    return (
                      <Link href={ruta.href} replace>
                        <div id="item-header-vertical">{ruta.nombre}</div>
                      </Link>
                    )
                }else{
                  if(ruta.href !== "/tienda/administrador")  {
                    return (
                      <Link href={ruta.href} replace>
                        <div id="item-header-vertical">{ruta.nombre}</div>
                      </Link>
                    )
                  }               
                }
              })}
            </nav>
          </div>
          {children}
        </ProviderProductos>
      </ProviderAcceso>
    </div>
  );
};

export default layout;
