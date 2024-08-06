/**
 * @file Página de perfil de usuario
 * @description Este componente representa la página de perfil del usuario, mostrando su información personal,
 * direcciones y compras realizadas. También permite añadir nuevas direcciones y realizar acciones como cerrar sesión
 * o eliminar la cuenta.
 */

"use client";
import React, { useEffect, useState } from "react";
import { decodeToken, JwtPayload } from "@/dataTypes";
import Button from "@/components/ui/btn/button";
import Input from "./components/Input";
import DireccionCard from "./components/DireccionCard";
import { useRouter } from "next/navigation";
import Compra from "./components/Compra";
import { cerrarSesion } from "./func/CerrarSesion";
import { fetchUser } from "@/hooks/fetchUser";
import deleteUser from "./func/EliminarUser";
import { deleteDireccionUser } from "./func/EliminarDireccion";

/**
 * @interface Direccion
 * @description Interfaz que define la estructura de una dirección de usuario
 */
export interface Direccion {
  id: string;
  street: string;
  city: string;
  neighborhood: string;
  state: string;
  zipCode: string;
}

/**
 * @interface CredencialesUser
 * @description Interfaz que define las credenciales básicas del usuario
 */
interface CredencialesUser {
  name: string;
  email: string;
  addresses: Direccion[];
}

/**
 * @function Page
 * @description Componente principal de la página de perfil
 */
const Page = () => {
  // Estados para manejar la carga, direcciones y datos del usuario
  const [loading, setLoading] = useState(true);
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [direccionUser, setDireccionUser] = useState({
    street: "",
    city: "",
    neighborhood: "",
    state: "",
    zipCode: "",
    userId: "",
  });
  const [mostrarFormAñadirDireccion, setMostrarFormAñadirDireccion] = useState(false);

  // Estado para almacenar todos los datos del usuario
  const [dataUser, setDataUser] = useState({
    id: "",
    email: '',
    name: '',
    role: '',
    phoneNumber: '',
    addresses: [],
    purchases: [],
    createdAt: '',
    updatedAt: ''
  });
  const [productosComprados, setProductosComprados] = useState([]);

  /**
   * @function GetdataUser
   * @description Obtiene los datos del usuario al cargar la página
   */
  useEffect(() => {
    const GetdataUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const decodedToken = decodeToken<JwtPayload>(token);
        const userId = decodedToken.sub;
        const data = await fetchUser(`http://localhost:4000/api/user/${userId}`, "GET");
        setDataUser(prev => ({...prev,
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          phoneNumber: data.phoneNumber,
          addresses: data.addresses
        }));
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    GetdataUser();
  }, [mostrarFormAñadirDireccion]);

  /**
   * @function GETproductosUser
   * @description Obtiene los productos comprados por el usuario
   */
  useEffect(() => {
    const GETproductosUser = async () => {
      try {
        const data = await fetchUser(`http://localhost:4000/api/purchase-product/my-purchases`, "GET");
        setProductosComprados(data);
      } catch (err) {
        console.log(err);
      }
    };
    GETproductosUser();
  }, []);
  
  /**
   * @function handleInputChange
   * @description Maneja los cambios en los inputs del formulario de dirección
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccionUser((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @function handleSubmit
   * @description Maneja el envío del formulario para añadir una nueva dirección
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(localStorage.getItem("access_token"));
    const body = {
      ...direccionUser, userId: 2
    };
    try {
      const data = await fetchUser(`http://localhost:4000/api/address`, "POST", body);
      console.log(data);
      setMostrarFormAñadirDireccion(false);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @function updateDireccionUser
   * @description Actualiza la dirección del usuario
   */
  const updateDireccionUser = async (id: string) => {
    const buscarDireccion = direcciones.find(
      (direccion) => direccion.id === id
    );

    if (!buscarDireccion) return;

    const direccionActualizada = {
      street: "tetas" || buscarDireccion.street,
      city: "tetas" || buscarDireccion.city,
      state: "tetas" || buscarDireccion.state,
      zipCode: "tetas" || buscarDireccion.zipCode,
    };
    
    try {
      const data = await fetchUser(`http://localhost:4000/api/address/${id}`, "PATCH", direccionActualizada);
      setDirecciones(prevDirecciones => prevDirecciones.map((dir) => (dir.id === id ? data : dir)));
    } catch (err) {
      console.error(err);
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

  // Renderizado principal de la página de perfil
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Sección de información del perfil */}
      <div>
        <h1 className="text-2xl font-bold">Perfil</h1>
        <span>nombre: {dataUser.name}</span>
        <br />
        <span>email: {dataUser.email}</span>
        <br />
      </div>
      {/* Sección de direcciones */}
      <div>
        <h1 className="text-2xl font-bold">Direcciones</h1>
        {dataUser.addresses.length > 0 ?
          dataUser.addresses.map((direccion, index) => (
            <DireccionCard
              key={index}
              direccion={direccion}
              onDelete={}
              onUpdate={updateDireccionUser}
            />
          )) : (
            <p>no hay direcciones </p>
          )}
        <Button
          txt="añadir"
          click={() => setMostrarFormAñadirDireccion(true)}
        ></Button>
        <br />
        {/* Formulario para añadir nueva dirección */}
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
      {/* Sección de compras */}
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
      {/* Sección de ajustes */}
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
