"use client"
import React, { useContext, useState } from "react";
import { TypeCarrito } from "../typo/interfaces";
import { ContextoProductos } from "../Providers/ProviderProductos";
import Button from "@/components/ui/btn/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ContextoAcceso } from "../Providers/ProviderPermisos";

interface Props {
  dataProducto: TypeCarrito;
  index: number;
}

const Producto: React.FC<Props> = ({ dataProducto, index }) => {
  const router = useRouter();
  const { productos, setProductos } = useContext(ContextoProductos);
  const acceso = useContext(ContextoAcceso)

  function redirecionar() {
    router.push(`/tienda/productos/${dataProducto.id}`);
  }

  // FUNCION LISTA
  async function clickEliminarProducto(id: number) {
    const token = localStorage.getItem('access_token');
    try {
      const respuesta = await fetch(`http://localhost:4000/api/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!respuesta.ok) {
        const data = await respuesta.json();
        console.error('Error al eliminar producto:', data);
        throw new Error('No se pudo eliminar el producto');
      }
      console.log('Producto eliminado con éxito');
      setProductos(productos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  return (
    <div
      id="producto-tienda"
      key={index}
      className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out"
    >
      <a className="absolute inset-0 z-10" href="#">
        <span className="sr-only">Ver producto</span>
      </a>
      <img className="object-cover w-full h-64 rounded-t-lg" src="https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg" alt={dataProducto.name} />
      <div className="p-4 bg-background rounded-b-lg">
        <h3 className="text-xl font-bold">{dataProducto.name}</h3>
        <h4 className="text-lg font-semibold">${dataProducto.price}</h4>
        <Button txt="ver" click={redirecionar}></Button>
        {acceso?.acceso && (
        <>
          <Button txt="eliminar" click={()=> clickEliminarProducto(dataProducto.id )}></Button>
          <Button txt="actualizar" click={()=>  router.push(`/tienda/administrador/${dataProducto.id}`)}></Button>
        </>
        )}
      </div>
    </div>
  );
};

export default Producto;
