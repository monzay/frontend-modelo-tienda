"use client"
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { ContextoAcceso } from "@/app/Providers/ProviderPermisos";
import { useRouter } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  const router = useRouter()
  const contexto = useContext(ContextoAcceso)
  
  useEffect(() => {
    console.log(contexto)
    if (contexto && !contexto.acceso) router.push("/tienda")
  }, [contexto, router])
  
  return (
    <div>
      <div className="bg-black flex h-[60px] justify-center items-center">
        <Link href="/tienda/administrador/Users" className="bg-white text-black h-4/5 px-2.5 flex items-center justify-center rounded" replace>
          <div>users</div>
        </Link>
        <Link href="/tienda/administrador" className="bg-white text-black h-4/5 px-2.5 flex items-center justify-center rounded" replace>
          <div>añadir</div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
