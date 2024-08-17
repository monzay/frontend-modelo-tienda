"use client"
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { ContextoAcceso } from "@/app/Providers/ProviderPermisos";
import { useRouter } from 'next/navigation'

/**
 * Componente de diseño para la sección de administrador de la tienda.
 * 
 * Este componente proporciona un diseño común para todas las páginas de administración,
 * incluyendo una barra de navegación y control de acceso.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que se renderizarán dentro de este diseño.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  
  const router = useRouter()
  const contexto = useContext(ContextoAcceso)
  
  /**
   * Efecto que verifica el acceso del usuario.
   * Si el usuario no tiene acceso de administrador, se le redirige a la página principal de la tienda.
   */
  useEffect(() => {
    console.log(contexto)
    if (contexto && !contexto.acceso) router.push("/tienda")
  }, [contexto, router])
  
  return (
    <div>
      {/* Barra de navegación */}
      <div className="bg-black flex h-[60px] justify-center items-center">
        {/* Enlace a la página de usuarios */}
        <Link href="/tienda/administrador/Users" className="bg-white text-black h-4/5 px-2.5 flex items-center justify-center rounded" replace>
          <div>users</div>
        </Link>
        {/* Enlace a la página principal de administración */}
        <Link href="/tienda/administrador" className="bg-white text-black h-4/5 px-2.5 flex items-center justify-center rounded" replace>
          <div>añadir</div>
        </Link>
      </div>
      {/* Renderiza los componentes hijos */}
      {children}
    </div>
  );
};

export default Layout;
