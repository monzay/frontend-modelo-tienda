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
          console.log(productoFiltrado)
        }
        cargarProducto()
      }, [productos, params.id])

      
      function agregarAlCarrito (){
          setAgregadoAlCarito(true)
          setCarrito(prevCarrito => [...prevCarrito,mostrarProductos[0]])
      }

      // contruye el espacio carrito en el localStorage 
      useEffect(() => {
        const  existe =  localStorage.getItem("carrito")
        if(!existe){
          localStorage.setItem("carrito",JSON.stringify([]))
        }
        }, [])

      // index carrito
      useEffect(() => {
        localStorage.setItem("carrito",JSON.stringify(carrito))
      }, [carrito])
      

 

      
      
      if (estaCargando) {
        return <div>Cargando...</div>
      }
    
      if (mostrarProductos.length === 0) {
        return <div>No se encontró el producto</div>
      }


    
    return (
    <div style={{background:"black",color:"white"}}> 
<div   className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
  <div className="grid gap-4 md:gap-10 items-start">
    <div className="grid gap-4">
      <img className="aspect-[16/9] object-cover border w-full rounded-lg overflow-hidden" />
    </div>
    <div className="grid gap-4 md:gap-10">
      <div className="grid gap-2">
        <h1 className="font-bold text-3xl lg:text-4xl">{ mostrarProductos[0].nombre} </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">${mostrarProductos[0].precio} </div>
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
        <div className="grid gap-4 text-sm leading-loose">
          <p>
            Presentamos la Camiseta Acme Circles, una mezcla perfecta de estilo y comodidad para el individuo
            moderno. Esta camiseta está fabricada con una composición meticulosa de 60% algodón peinado anillado y
            40% poliéster jersey, asegurando una tela suave y transpirable que se siente delicada contra la piel.
          </p>
          <p>
            El diseño de la Camiseta Acme Circles es tan impactante como cómodo. La camiseta presenta un patrón
            inspirado en un prisma único que agrega un toque moderno y llamativo a tu conjunto.Circles es tan
            impactante como cómodo. La camiseta presenta un patrón inspirado en un prisma
          </p>
        </div>
      </div>
    </div>
    <div className="rounded-lg  bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Especificaciones técnicas
        </h3>
      </div>
      <div className="p-6">
        <div className="grid gap-4 text-sm leading-loose">
          <p>- Composición: 60% algodón peinado anillado, 40% poliéster jersey</p>
          <p>- Corte: Estándar</p>
          <p>- Cuello: Redondo</p>
          <p>- Mangas: Cortas</p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default page