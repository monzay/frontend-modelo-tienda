// Importación de módulos y componentes necesarios
"use client"
import React, { useContext ,useEffect, useState} from "react";
import Button from "@/components/ui/btn/button";
import { ContextoProductos } from "../../Providers/ProviderProductos";

// Definición del componente principal
const page = () => {

  // Obtención del carrito y la función para actualizarlo del contexto
  const{carrito,setCarrito} = useContext(ContextoProductos)
    /////////////////////////////////////////////////////////////////////////////////////
    // Función para eliminar un producto del carrito
    function clickEliminarProductoCarrito(id: number) : void  {
      setCarrito(prev => prev.filter(producto => producto.id !== id ))
    } /////////////////////////////////////////////////////////////////////////////////////

    // Efecto para cargar los datos del carrito al montar el componente
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    } else {
      localStorage.setItem("carrito", JSON.stringify([]));
    }
  }, []);

  // Efecto para guardar los datos del carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
    
    
  // Función para manejar la acción de comprar (actualmente vacía)
  function clickComprar (){
  }  

  // Renderizado del componente
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Carrito</h1>
      </div>
       {
         // Mapeo de los productos en el carrito
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
                    <h3 className="text-lg font-medium">{productosCarrito.name} </h3>
                    <p className="text-muted-foreground text-sm">${productosCarrito.price} </p>
                  </div>
                  <Button click={() => clickEliminarProductoCarrito(productosCarrito.id)} txt="eliminar"></Button>
                </div>
                <div className="text-right"></div>
              </div>
            </div>
          </div>
         ))
       }
       <div>
         <button onClick={clickComprar} style={{width:"100%" ,background:"black",color:"white",height:"40px",borderRadius:"5px"}}>comprar</button>
       </div>
    </div>
  );
};

// Exportación del componente
export default page;
