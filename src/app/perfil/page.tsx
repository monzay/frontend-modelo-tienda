"use client";
import React, { useEffect, useState } from "react";
import { decodeToken, JwtPayload } from "@/dataTypes";
import Button from "@/components/ui/btn/button";
import Input from "../../components/Input";
import DireccionCard from "../../components/DireccionCard";
import Compra from "../../components/Compra";
import { cerrarSesion } from "./func/CerrarSesion";
import { fetchUser } from "@/hooks/fetchUser";
import deleteUser from "./func/EliminarUser";
import { obtenerUserData } from "./func/obtenerUserData";
import { obtenerToken } from "../funciones";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [direccionUser, setDireccionUser] = useState({
    street: "",
    city: "",
    neighborhood: "",
    state: "",
    zipCode: "",
    userId: "",
  });
  const [mostrarFormAñadirDireccion, setMostrarFormAñadirDireccion] =
    useState(false);
  const [dataUser, setDataUser] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
    phoneNumber: "",
    addresses: [],
    purchases: [],
    createdAt: "",
    updatedAt: "",
  });
  const [productosComprados, setProductosComprados] = useState([]);





  useEffect(() => {
    obtenerUserData(setLoading, setDataUser);
  }, [mostrarFormAñadirDireccion]);

  useEffect(() => {
    const GETproductosUser = async () => {
      try {
        const response = await fetchUser(
          `http://localhost:4000/api/purchase-product/my-purchases`,
          "GET"
        );
        if (response.ok) {
          setProductosComprados(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    GETproductosUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccionUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = obtenerToken("access_token");
    if(token){
      const tokenDecode = decodeToken<JwtPayload>(token);
      const body = {
        ...direccionUser,
        userId: tokenDecode.sub
      };
      try {
        const response = await fetchUser(`http://localhost:4000/api/address`, "POST", body);
        if(response.ok) {
          setMostrarFormAñadirDireccion(false);
        } else {
          console.error("Error al agregar la dirección: ", response.statusText);
        }
      } catch (err) {
        console.error("Error al agregar la dirección: ", err);
      }     
    } else {
      console.error("El usuario no está autenticado.");
    }
  };

  // Renderizado condicional basado en el estado de carga
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (!dataUser) {
    return <div>No se pudo cargar la información del usuario.</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold pt-2 pb-2">Perfil</h1>
        <span>nombre: {dataUser.name}</span>
        <br />
        <span>email: {dataUser.email}</span>
        <br />
      </div>
      <div>
        <h1 className="text-2xl font-bold  pt-2 pb-2">Direcciones</h1>
        {dataUser.addresses.length > 0 ? (
          dataUser.addresses.map((direccion, index) => (
            <DireccionCard key={index} direccion={direccion} setDataUser={setDataUser} />
          ))
        ) : (
          <p>no hay direcciones </p>
        )}
        <Button
          txt="añadir"
          click={() => setMostrarFormAñadirDireccion(true)}
        ></Button>
        <br />
        {mostrarFormAñadirDireccion && (
          <form onSubmit={handleSubmit}>
            <Input
              name="street"
              value={direccionUser.street}
              inputChange={handleInputChange}
              placeholder="Calle"
            />
            <Input
              name="city"
              value={direccionUser.city}
              inputChange={handleInputChange}
              placeholder="Ciudad"
            />
            <Input
              name="neighborhood"
              value={direccionUser.neighborhood}
              inputChange={handleInputChange}
              placeholder="Barrio"
            />
            <Input
              name="state"
              value={direccionUser.state}
              inputChange={handleInputChange}
              placeholder="Estado"
            />
            <Input
              name="zipCode"
              value={direccionUser.zipCode}
              inputChange={handleInputChange}
              placeholder="Código Postal"
            />
            <button type="submit">Guardar dirección</button>
          </form>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">Compras</h1>
        {productosComprados.length > 0 ? (
          productosComprados.map((producto, index) => (
            <Compra producto={producto} index={index} key={index}></Compra>
          ))
        ) : (
          <p>No hay productos comprados</p>
        )}
      </div>
      <div>
        <h6>Ajustes</h6>
        <div onClick={cerrarSesion}>
          <p>Cerrar sesion</p>
        </div>
        <div onClick={() => deleteUser()}>
          <p>eliminar cuenta</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
