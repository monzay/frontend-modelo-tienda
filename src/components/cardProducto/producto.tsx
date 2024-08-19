"use client"
import React, { useContext,useEffect } from "react";
import { TypeCarrito } from "../../app/typo/interfaces";
import { ContextoProductos } from "../../app/Providers/ProviderProductos";
import Button from "@/components/ui/btn/button";
import { useRouter } from "next/navigation";
import { ContextoAcceso } from "../../app/Providers/ProviderPermisos";
import { redirecionar } from "@/app/funciones";
import { deleteProducto } from "./func/delete";
interface Props {
  dataProducto: TypeCarrito;
  index: number;
}

const Producto: React.FC<Props> = ({ dataProducto, index }) => {
/////////////////////////////////////////////////////////////////////////////////////////////
  const { productos, setProductos } = useContext(ContextoProductos);
/////////////////////////////////////////////////////////////////////////////////////////////
  const router = useRouter();
/////////////////////////////////////////////////////////////////////////////////////////////
  const acceso = useContext(ContextoAcceso)

  return (
    <div id="producto-tienda" key={index} className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img className="object-cover w-full h-64 rounded-t-lg" src="https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg" alt={dataProducto.name} />
      <div className="p-4 bg-background rounded-b-lg">
        <h3 className="text-xl font-bold">{dataProducto.name}</h3>
        <h4 className="text-lg font-semibold">${dataProducto.price}</h4>
        <Button txt="ver" click={ ()=> redirecionar(`/tienda/productos/${dataProducto.id}`,router)}></Button>
        {acceso?.acceso && (
        <>
          <Button txt="eliminar" click={()=>   deleteProducto(`http://localhost:4000/api/products/delete`,"DELETE",setProductos,productos,dataProducto.id)  }></Button>
          <Button txt="actualizar" click={()=>  redirecionar(`/tienda/administrador/update/${dataProducto.id}`,router) }></Button>
        </>
        )}
      </div>
    </div>
  );
};

export default Producto;
