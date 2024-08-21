"use client";
import { ProviderProductos } from "../Providers/ProviderProductos";
import "@/app/asset/tienda.css";
import { ProviderAcceso } from "../Providers/ProviderPermisos";
import HeaderLateral from "@/components/headerLateral";
import { ProviderBoolHeaderLateralCelular } from "../Providers/ProviderBoolHeaderLateralCelualr";
const layout = ({ children }: { children: React.ReactNode }) => {

  
  return (
    <div style={{ width: "100%" }}>
      <ProviderBoolHeaderLateralCelular>
      <ProviderAcceso>
        <ProviderProductos>
          <HeaderLateral/>
          {children}
        </ProviderProductos>
      </ProviderAcceso>
      </ProviderBoolHeaderLateralCelular>
    </div>
  );
};

export default layout;
