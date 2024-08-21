// Importación de módulos y componentes necesarios
"use client";
import React, {useEffect, useContext } from "react";
import Button from "@/components/ui/btn/button";
import { ContextoProductos } from "../../Providers/ProviderProductos";
import { deleteProductoCarrito } from "./funcs/delete";
import { sumaDeTodosLosPrecios } from "./funcs/sumaTodoLosPrecios";
const page = () => {
  const { carrito, setCarrito } = useContext(ContextoProductos);


  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Carrito</h1>
      </div>
      <div className="">
        <h2 className="text-lg font-semibold">Datos</h2>
        <p className="text-sm text-gray-600">productos {carrito.length} </p>
        <p className="text-sm text-green-600">total a pagar:  ${sumaDeTodosLosPrecios(carrito).toFixed(2)} </p>
      </div>
      {carrito.map((productosCarrito: any) => (
        <div className="grid gap-4 pt-2 pb-2 ">
          <div
            className="rounded-lg border bg-card text-card-foreground  shadow-sm p-4"
            data-v0-t="card"
          >
            <div className="flex items-center justify-between ">
              <div style={{width:"100%", display:"flex",justifyContent:"space-between"}} className="flex items-center  gap-2 ">
                <div style={{display:"flex",justifyContent:"space-between", alignItems: "center"}}>
                  <img className="w-10 h-10 rounded-full" src="https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg"/>
                  <div style={{marginLeft: "10px"}}>
                    <h3 className="text-lg font-medium">
                      {productosCarrito.name}
                    </h3>
                    <p className="text-sm">
                      cantidad: {productosCarrito.stock}
                    </p>
                    <p className="text-sm text-green-600">
                      ${productosCarrito.price}
                    </p>
                  </div>
                </div>
                <Button
                  click={() =>
                    deleteProductoCarrito(productosCarrito.id, setCarrito)
                  }
                  txt="eliminar"
                ></Button>
              </div>
              <div className="text-right"></div>
            </div>
          </div>
        </div>
      ))}
      <div>
        <button
          style={{
            width: "100%",
            background: " #0070f3",
            color: "white",
            height: "40px",
            borderRadius: "5px",

          }}
        >
          comprar
        </button>
      </div>
    </div>
  );
};

// Exportación del componente
export default page;
