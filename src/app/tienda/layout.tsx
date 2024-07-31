import React from 'react'
import Link from 'next/link'
import { ProviderProductos } from '../Providers/ProviderProductos'
import "./tienda.css"

const layout = ({children} : {children:React.ReactNode}) => {
  return (
    <div style={{width:"100%"}}>
        <ProviderProductos>
    <div id="header-vertical" className="bg-muted border-r">
            <nav id="nav-header-vertical" className="flex flex-col">
            <Link href="/tienda">
              <div id="item-header-vertical">
              Inicio
              </div>
              </Link>
              <Link href="./tienda/sobreNosotros">
             <div id="item-header-vertical">
             nosotros
             </div >
              </Link>
              <Link href="/profile">
              <div id="item-header-vertical">
              perfil
              </div>
              </Link>
              <Link href="./tienda/todoLosProductos">
              <div id="item-header-vertical">
              todos los productos
              </div>
              </Link>
            </nav>
          </div>
          {children}
          </ProviderProductos>
    </div>
  )
}

export default layout