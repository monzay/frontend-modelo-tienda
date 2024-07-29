"use client"
import React, { useContext } from "react";
import { ContextoProductos } from "../../Providers/ProviderProductos";

const page = () => {
  const {productosComprados} = useContext(ContextoProductos)
  return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mis Compras</h1>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-4 h-4 mr-2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filtrar
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-4 h-4 mr-2"
              >
                <line x1="10" x2="21" y1="6" y2="6"></line>
                <line x1="10" x2="21" y1="12" y2="12"></line>
                <line x1="10" x2="21" y1="18" y2="18"></line>
                <path d="M4 6h1v4"></path>
                <path d="M4 10h2"></path>
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
              </svg>
              Ordenar
            </button>
          </div>
        </div>
        <div className="grid gap-4">

          {
            productosComprados.map(productos  => (
              <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    alt="Bolso de cuero"
                    width="64"
                    height="64"
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{productos.nombre} </h3>
                    <p className="text-muted-foreground text-sm">${productos.precio} </p>
                  </div>
                </div>
                <div className="text-right"></div>
              </div>
            </div>
            ))
          }
        </div>
      </div>
  );
};

export default page;
