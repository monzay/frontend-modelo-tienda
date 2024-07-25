"use client"
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const page = () => {

  return (
    <div style={{width:"100%"}}>
      <div className="flex flex-col min-h-screen">
        <header className="bg-background border-b px-4 md:px-6 py-3 flex items-center justify-between">
          <a className="text-2xl font-bold" href="#">
            Tienda Minimalista
          </a>
          <div className="flex items-center gap-4">
            <input
              type=""
              placeholder="buscar"
              style={{
                padding: "5px 3px",
                border: "1px solid black",
                borderRadius: "10px",
              }}
            />
            <a className="relative" href="#">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                  className="h-5 w-5"
                >
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
                <span className="sr-only">Carrito</span>
              </button>
              <div
                className="inline-flex w-fit items-center whitespace-nowrap border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 absolute -top-2 -right-2 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs font-medium"
                data-v0-t="badge"
              >
                3
              </div>
            </a>
          <Link href="/perfil">
          <div className="icon-perfil"  style={{width:"30px",background:"black",height:"30px",borderRadius:"50%"}}>
          </div></Link>
          </div>
        </header>
        <div className="" >
          <main className="flex-1 px-4 md:px-6 py-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                <a className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">Ver producto</span>
                </a>
                <img
                  src="/placeholder.svg"
                  alt="Producto 1"
                  width="500"
                  height="400"
                  className="object-cover w-full h-64 rounded-t-lg"
                />
                <div className="p-4 bg-background rounded-b-lg">
                  <h3 className="text-xl font-bold">Camiseta de Algodón</h3>
                  <p className="text-sm text-muted-foreground">
                    Suave y cómoda
                  </p>
                  <h4 className="text-lg font-semibold">$29.99</h4>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                <a className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">Ver producto</span>
                </a>
                <img
                  src="/placeholder.svg"
                  alt="Producto 2"
                  width="500"
                  height="400"
                  className="object-cover w-full h-64 rounded-t-lg"
                />
                <div className="p-4 bg-background rounded-b-lg">
                  <h3 className="text-xl font-bold">Pantalón de Lino</h3>
                  <p className="text-sm text-muted-foreground">
                    Fresco y elegante
                  </p>
                  <h4 className="text-lg font-semibold">$49.99</h4>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                <a className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">Ver producto</span>
                </a>
                <img
                  src="/placeholder.svg"
                  alt="Producto 3"
                  width="500"
                  height="400"
                  className="object-cover w-full h-64 rounded-t-lg"
                />
                <div className="p-4 bg-background rounded-b-lg">
                  <h3 className="text-xl font-bold">Zapatos de Cuero</h3>
                  <p className="text-sm text-muted-foreground">
                    Elegantes y duraderos
                  </p>
                  <h4 className="text-lg font-semibold">$59.99</h4>
                </div>
              </div>
            </section>
          </main>
        </div>
        <footer className="bg-muted p-4 md:p-6 text-sm text-muted-foreground">
          <div className="container max-w-7xl mx-auto flex items-center justify-between"></div>
        </footer>
      </div>
    </div>
  );
};

export default page;
