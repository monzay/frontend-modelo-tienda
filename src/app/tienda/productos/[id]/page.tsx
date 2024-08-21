// Importación de módulos y componentes necesarios
"use client";
import { ContextoProductos } from "@/app/Providers/ProviderProductos";
import React, { useContext, useEffect, useState } from "react";

const page = ({ params }: any) => {
  const { productos, setCarrito ,carrito} = useContext(ContextoProductos);
  const [mostrarProductos, setMostrarProducto] = useState<any>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [agregadoAlCarito, setAgregadoAlCarito] = useState(false);
  const [stock, setStock] = useState({});

  useEffect(() => {
    const cargarProducto = async () => {
      setEstaCargando(true);
      const productoFiltrado = productos.filter(
        (producto: any) => producto.id === parseInt(params.id)
      );
      setMostrarProducto(productoFiltrado);
      setEstaCargando(false);
      setStock({ ...productoFiltrado[0], stock: 1 });
    };
    cargarProducto();
  }, [params.id, productos]);

   
  
  // no entiend como arreglar el error de tyoescript 
  function añadirCarrito() {
    setCarrito((prev: any)  =>{
      const index = prev.findIndex((item: any) => item.id === stock.id);
      if (index !== -1) {
        prev[index].stock += parseInt(stock.stock);
      } else {
        return [...prev, { ...stock, stock: parseInt(stock.stock) }];
      }
      return prev;
    });
  }

  if (estaCargando) {
    return <div>Cargando...</div>;
  }
  if (mostrarProductos.length === 0) {
    return <div>No se encontró el producto</div>;
  }
  
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <img
              src="https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg"
              className="aspect-[16/9] object-cover border w-full rounded-lg overflow-hidden"
            />
          </div>
          <div className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <h1 className="font-bold text-3xl lg:text-4xl">
                {mostrarProductos[0].name}{" "}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-green-600">
              <p style={{ color: ""}}> ${mostrarProductos[0].price} </p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>cantidas : {mostrarProductos[0].stock}</p>
              <div>
                comprar :{" "}
                <input
                  style={{
                    width:"100px"
                  }}
                  placeholder="1"
                  onChange={(e) =>
                    setStock((prev) => ({
                      ...prev,
                      stock:e.target.value || 1
                    }))
                  }
                  type="number"
                  min="0"
                  max={mostrarProductos[0].stock}
                />
              </div>
            </div>
            <button
className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
              onClick={añadirCarrito}
            >
              {agregadoAlCarito ? "Agregado al carrito" : "Agregar al carrito"}
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:gap-10">
          <div
            className="rounded-lg  bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Detalles del producto
              </h3>
            </div>
            <div className="p-6">
              <div className="grid text-sm leading-loose">
                <p>{mostrarProductos[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default page;
