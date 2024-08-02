"use client"
import { ContextoProductos } from '@/app/Providers/ProviderProductos'
import { TypeCarrito } from '@/app/typo/interfaces'
import React, { useContext,useEffect, useState } from 'react'


interface PageProps {
    params: {
      id: string
    }
  }

  
  const page = ({params} :PageProps   ) => {

    
    const {productos,setCarrito,carrito} = useContext(ContextoProductos)
    const [mostrarProductos,setMostrarProducto] = useState<TypeCarrito[]>([])
    const [estaCargando, setEstaCargando] = useState(true)
    const [agregadoAlCarito,setAgregadoAlCarito] =  useState(false)
    
    
    

    // FUNCION carga el producto 
    useEffect(() => {
        const cargarProducto = () => {
          setEstaCargando(true)
          const productoFiltrado = productos.filter(producto => producto.id === parseInt(params.id))
          setMostrarProducto(productoFiltrado)
          setEstaCargando(false)
        }
        cargarProducto()
      }, [productos, params.id])

      
      function agregarAlCarrito (){
          setAgregadoAlCarito(true)
          setCarrito(prevCarrito => [...prevCarrito,mostrarProductos[0]])
      }



      
      
      
      
      if (estaCargando) {
        return <div>Cargando...</div>
      }
    
      if (mostrarProductos.length === 0) {
        return <div>No se encontró el producto</div>
      }

    
    return (
    <div > 
<div   className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
  <div className="grid gap-4 md:gap-10 items-start">
    <div className="grid gap-4">
      <img  src="https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg" className="aspect-[16/9] object-cover border w-full rounded-lg overflow-hidden" ></img>
    </div>
    <div className="grid gap-4 md:gap-10">
      <div className="grid gap-2">
        <h1 className="font-bold text-3xl lg:text-4xl">{ mostrarProductos[0].name} </h1>
      </div>
      <div className="flex items-center">
        <div className="text-4xl font-bold">${mostrarProductos[0].price} </div>
      </div>
      <div>
        cantidas : {mostrarProductos[0].stock}
      </div>
    <button className={`${agregadoAlCarito ? "activar-agregado-al-carrito" : "btn-carritos"}`} onClick={agregarAlCarrito} >
      {agregadoAlCarito ? "Agregado al carrito": "Agregar al carrito"}
    </button>
    </div>
  </div>
  <div className="grid gap-4 md:gap-10">
    <div className="rounded-lg  bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Detalles del producto</h3>
      </div>
      <div className="p-6">
        <div className="grid text-sm leading-loose">
          <p>
            {mostrarProductos[0].description}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default page