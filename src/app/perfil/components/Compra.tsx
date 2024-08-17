import React from 'react'

interface producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CompraProps {
    producto: producto;
  index: number;
}

const Compra: React.FC<CompraProps> = ({ producto, index }) => {
  return (
    <div key={index} className="grid gap-4">
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
      data-v0-t="card"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="" alt={producto.nombre} className="rounded-md w-16 h-16 object-cover" />
          <div>
            <h3 className="text-lg font-medium">{producto.nombre}</h3>
            <p className="text-muted-foreground text-sm">${producto.precio}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">Cantidad: {producto.cantidad}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Compra