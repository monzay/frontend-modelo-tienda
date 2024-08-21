import React, { useContext, useState } from "react";
import Link from "next/link";
import { ContextoProductos } from "@/app/Providers/ProviderProductos";

import HeaderLateral from "./headerLateral";
import { ContextoHeaderLateralCelular } from "@/app/Providers/ProviderBoolHeaderLateralCelualr";
interface TypeProps {
  setPalabra: React.Dispatch<React.SetStateAction<string>>;
}
const Header = ({ setPalabra }: TypeProps) => {
  const { carrito } = useContext(ContextoProductos);
  const { setMostrarHeaderLateralCelular} = useContext(ContextoHeaderLateralCelular)

  return (
    <header
      id="header-horizontal"
      className="bg-background border-b px-4 md:px-6 py-3 flex items-center justify-between"
    >
      <div id="icon-menu-header" onClick={()=> setMostrarHeaderLateralCelular(true)}>x</div>
      <div></div>
      <div className="flex items-center gap-4">
        <input
          onChange={(e) => setPalabra(e.target.value)}
          type="text"
          placeholder="buscar"
          className="p-1 px-2 border border-black rounded-md"
        />
        <a className="relative" href="#">
          <Link href="./tienda/carrito">
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
          </Link>
          <div
            className="inline-flex w-fit items-center whitespace-nowrap border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 absolute -top-2 -right-2 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs font-medium"
            data-v0-t="badge"
          >
            {carrito.length}
          </div>
        </a>
        <Link href="/perfil" replace={true}>
          <div
            className="icon-perfil"
            style={{
              width: "30px",
              background: "black",
              height: "30px",
              borderRadius: "50%",
            }}
          ></div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
