"use client"
import React, { useContext, useState,useEffect } from "react";
import { ApiProducto } from "../typo/interfaces";
import { ContextoProductos } from "../Providers/ProviderProductos";
import Button from "@/components/ui/btn/button";
import { useRouter } from "next/navigation";


interface Props {
  dataProducto: ApiProducto;
  index: number;
}
 /////////////////////////////////////////////////////////////////////////////////////

const Producto : React.FC<Props> =({ dataProducto, index  }) =>  {


  const router = useRouter()
  const {setCarrito,setProductos} = useContext(ContextoProductos)
  const [modoAcministrador,setModoAcministrador] = useState(false)
   /////////////////////////////////////////////////////////////////////////////////////
  
  function redireccionaAlProducto() {
    router.push(`/tienda/productos/${dataProducto.id}`);
  }

 function clickEliminarProducto (){
  setProductos(prev => prev.filter(producto => producto.id !== dataProducto.id))
 }

 function clickActualizarProducto (){
  const newData = {
    nombre:"tetas",
    precio:234,
  }
  
  
  setProductos(prev => {
    return prev.map(prod => {
      if (prod.id === dataProducto.id) {
        return { ...prod, ...newData };
      }
      return prod;
    });
  }); 
 }
   /////////////////////////////////////////////////////////////////////////////////////


  
  return (
    <div
    onClick={( ) => {
      redireccionaAlProducto()
    }}
      key={index}
      className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out"
    >
      <a className="absolute inset-0 z-10" href="#">
        <span className="sr-only">Ver producto</span>
      </a>
      <img className="object-cover w-full h-64 rounded-t-lg" />
      <div className="p-4 bg-background rounded-b-lg">
        <h3 className="text-xl font-bold">{dataProducto.nombre} </h3>
        <h4 className="text-lg font-semibold">${dataProducto.precio} </h4>
        <Button txt="Ver" click={()=> {}}></Button> 
      {modoAcministrador && (
    <>
      <Button txt="Eliminar"  click={clickEliminarProducto}></Button>
      <Button txt="Actualizar" click={clickActualizarProducto}></Button>
    </>
  )}
      </div>
  
    </div>
  );
};

export default Producto;
