import React, { useState, useEffect } from "react";
import { JwtPayload } from "jwt-decode";
import { rutas } from "@/app/tienda/json";
import Link from "next/link";
import { obtenerToken } from "@/app/funciones";
import { decodeToken } from "@/dataTypes";

const HeaderLateralCelular  = () => {
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
    <div style={{position:"absolute",zIndex:"100",width:"100%",background:"white",height:"100vh"}}>
      <nav>
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

export default HeaderLateralCelular;
