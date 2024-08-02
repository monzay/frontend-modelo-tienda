"use client"
import React, { use, useContext, useEffect, useState } from "react";
import Producto from "./producto";
import { TypeCarrito } from "../typo/interfaces";
import Header from "@/components/Header";
import { ContextoProductos } from "../Providers/ProviderProductos";

  
const page =  () => { 
   const {productos} = useContext(ContextoProductos)
   const [palabra,setPalabra] = useState("")
   const [productoFiltrados,setProductosFiltrados] = useState<TypeCarrito[]>([])
  
   /////////////////////////////////////////////////////////////////////////////////////

   useEffect(() => {
     console.log(productos)
   }, [productos])
   
   // funcion para buscar el producto por el usuario 
   useEffect(() => {
    function buscandoProducto(): void {
      const productoEncontrado = productos.filter((producto) =>
        producto.name.toLocaleLowerCase().includes(palabra.trim().toLocaleLowerCase())
      );
      // se inicializa para que se pueda ver todos los productos al cargar la pagina
      setProductosFiltrados(productos) 
      // filtra lso producto por la letras del usuaio 
      setProductosFiltrados(productoEncontrado);
    }
    buscandoProducto();
  }, [palabra,productos]);


  /////////////////////////////////////////////////////////////////////////////////////ç
  
  return (
    <div style={{width:"100%"}}>
      <div className="flex flex-col min-h-screen">
        <Header setPalabra={setPalabra}></Header>
        <div  >
          <main className="flex-1 px-4 md:px-6 py-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {
             productoFiltrados.length > 0  &&  productoFiltrados.map( (producto,index)  => (
                    <Producto dataProducto={producto} index={index} ></Producto>
                ))
            }  
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
