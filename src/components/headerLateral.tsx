import React, { useState, useEffect } from "react";
import { JwtPayload } from "jwt-decode";
import { rutas } from "@/app/tienda/json";
import Link from "next/link";
import { obtenerToken } from "@/app/funciones";
import { decodeToken } from "@/dataTypes";

const HeaderLateral = () => {
  const [administrador, setAdministrador] = useState(false);

  useEffect(() => {
    const token = obtenerToken("access_token");
    if (token) {
      const decodedToken = decodeToken<JwtPayload>(token);
      if (decodedToken.role === "SUPERADMIN") {
        setAdministrador(true);
      }
    }
  }, []);

  return (
    <div id="header-vertical" className="bg-muted border-r ">
      <nav id="nav-header-vertical" className="flex flex-col">
        {rutas.map((ruta) => {
          if (administrador) {
            return (
              <Link href={ruta.href} replace>
                <div id="item-header-vertical">{ruta.nombre}</div>
              </Link>
            );
          } else {
            if (ruta.href !== "/tienda/administrador") {
              return (
                <Link href={ruta.href} replace>
                  <div id="item-header-vertical">{ruta.nombre}</div>
                </Link>
              );
            }
          }
        })}
      </nav>
    </div>
  );
};

export default HeaderLateral;
