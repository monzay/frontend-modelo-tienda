"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ProviderProductos } from "../Providers/ProviderProductos";
import "./tienda.css";
import { ProviderAcceso } from "../Providers/ProviderPermisos";
const layout = ({ children }: { children: React.ReactNode }) => {
  const [acceso, setAcceso] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <ProviderAcceso>
        <ProviderProductos>
          <div id="header-vertical" className="bg-muted border-r">
            <nav id="nav-header-vertical" className="flex flex-col">
              <Link href="/tienda" replace>
                <div id="item-header-vertical">Inicio</div>
              </Link>
              <Link href="/tienda/sobreNosotros" replace>
                <div id="item-header-vertical">nosotros</div>
              </Link>
              <Link href="/tienda/perfil" replace>
                <div id="item-header-vertical">perfil</div>
              </Link>
              <Link href="/tienda/todosLosProductos" replace>
                <div id="item-header-vertical">todos los productos</div>
              </Link>
              {acceso && (
                <>
                  <Link href="/tienda/administrador" replace>
                    <div id="item-header-vertical">administracion</div>
                  </Link>
                </>
              )}
            </nav>
          </div>
          {children}
        </ProviderProductos>
      </ProviderAcceso>
    </div>
  );
};

export default layout;
