"use client"
import { ContextoProductos } from '@/app/Providers/ProviderProductos'
import React, { useContext, useState } from 'react'

const Page = ({params}) => {
  const { productos, setProductos } = useContext(ContextoProductos)
  const [busqueda, setBusqueda] = useState('')



  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar producto" 
        value={busqueda} 
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div>
        {productosFiltrados.map(producto => (
          <div key={producto.id}>
            <span>Nombre: {producto.name} </span>
            <div>
              <button onClick={() => clickEliminarProducto(producto.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page