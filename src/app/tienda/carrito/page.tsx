"use client"
import React, { useContext ,useEffect, useState} from "react";
import Button from "@/components/ui/btn/button";
import { ContextoProductos } from "../../Providers/ProviderProductos";
import { Castoro } from "next/font/google";

const page = () => {

  const{carrito,setCarrito} = useContext(ContextoProductos)
    
      /////////////////////////////////////////////////////////////////////////////////////
  
    function clickEliminarProductoCarrito(id: number) : void  {
      setCarrito(prev => prev.filter(producto => producto !== producto))
    } /////////////////////////////////////////////////////////////////////////////////////

    // cargamos todos los datos del carrito al estado
    
    useEffect(() => {
      const  exite = localStorage.getItem("carrito")
      if(exite){
        setCarrito(JSON.parse(exite))
      }else{
        localStorage.setItem("carrito",JSON.stringify([]))
      }
    }, [])
    
    useEffect(() => {
      const  exite = localStorage.getItem("carrito")
      if(exite || carrito.length > 0 ) localStorage.setItem("carrito",JSON.stringify(carrito))
    }, [carrito])
  
    
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Carrito</h1>
      </div>
       {
         carrito.map(productosCarrito => ( 
            <div className="grid gap-4">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="flex items-center justify-between" >
                               <div className="flex items-center  gap-2 "  >
                  <img className="rounded-md" />
                  <div>
                    <h3 className="text-lg font-medium">{productosCarrito.nombre} </h3>
                    <p className="text-muted-foreground text-sm">${productosCarrito.precio} </p>
                  </div>
                  <Button click={() => clickEliminarProductoCarrito(productosCarrito.id)} txt="eliminar"></Button>
                </div>
                <div className="text-right"></div>
              </div>
            </div>
          </div>
         ))
       }
    </div>
  );
};

export default page;
