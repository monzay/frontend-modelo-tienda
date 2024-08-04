"use client";
import React, { useEffect, useState } from "react";
import { decodeToken, JwtPayload } from "@/dataTypes";
import Button from "@/components/ui/btn/button";
import Input  from "./components/Input";
import DireccionCard from "./components/DireccionCard";
import { useRouter } from "next/navigation";
import { ContextoProductos } from "@/app/Providers/ProviderProductos";
export  interface Direccion {
  id: string;
  street: string;
  city: string;
  neighborhood: string;
  state: string;
  zipCode: string;
}

interface CredencialesUser {
  name: string;
  email: string;
  addresses: Direccion[];
}

const Page = () => {
  const router = useRouter()
  const [credencialesUser, setCredencialesUser] =
    useState<CredencialesUser | null>(null);
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
  const [productosCompradosUser,setProductosCompradosUser] = useState([])
  const [mostrarFormAñadirDireccion, setMostrarFormAñadirDireccion] =useState(false);
  ///////////////////////////////////////////////////////////////////////////////////////

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
        const res = await fetch(`http://localhost:4000/api/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        console.log(data);
        setCredencialesUser(data);
        setDirecciones(data.addresses || []);
        setDireccionUser((prev) => ({ ...prev, userId: userId }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    GetdataUser();
  }, [mostrarFormAñadirDireccion,direcciones]);

  // feact para obtener lso productos comprados del usuario failt
  useEffect(() => {
    const GETproductosUser = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`http://localhost:4000/api/purchase`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Error al obtener los productos comprados");
        }
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    GETproductosUser();
  }, []);

  



  useEffect(() => {
    
    const GETproductosUser = async () => {
      const token = localStorage.getItem("access_token");
      if(!token){
        return 
      }
      try {
        const res = await fetch(`http://localhost:4000/api/purchase-product/my-purchases`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to delete address");
        }
        setProductosCompradosUser(data)
        
      } catch (err) {
        console.log(err);
      }
    }
    GETproductosUser()
  }, [])
  
  ///////////////////////////////////////////////////////////////////////////////////////
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccionUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:4000/api/address`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(direccionUser),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to add address");
      }
      console.log(data);
      setDirecciones(data);
      setMostrarFormAñadirDireccion(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDireccionUser = async (id: string) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:4000/api/address/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to delete address");
      }
      setDirecciones(prev => prev.filter(dir => dir.id !==  id ) )
    } catch (err) {
      console.log(err);
    }
  };

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

    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:4000/api/address/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(direccionActualizada),
      });
      if (!res.ok) {
        throw new Error("Error al actualizar la dirección");
      }
      const data = await res.json();
      // Actualizar el estado de direcciones
      setDirecciones(direcciones.map((dir) => (dir.id === id ? data : dir)));
    } catch (err) {
      console.error(err);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (!credencialesUser) {
    return <div>No se pudo cargar la información del usuario.</div>;
  }
  ///////////////////////////////////////////////////////////////////////////////////////


  const cerrarSesion = () => {
    localStorage.removeItem("access_token")
    router.push("/")
  }

  const deleteUser = async () => {
    const token = localStorage.getItem("access_token");
    if(!token){
      return 
    }
    const decodedToken = decodeToken<JwtPayload>(token)
    try {
      const res = await fetch(`http://localhost:4000/api/user/${decodedToken.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to delete address");
      }
      console.log(data)
      router.push("/")
      localStorage.removeItem("access_token")
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold">Perfil</h1>
        <span>nombre: {credencialesUser.name}</span>
        <br />
        <span>email: {credencialesUser.email}</span>
        <br />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Direcciones</h1>
        {direcciones.length > 0 &&
          direcciones.map((direccion, index) => (
            <DireccionCard
            key={direccion.id}
            direccion={direccion}
            onDelete={deleteDireccionUser}
            onUpdate={updateDireccionUser}
          />
          ))}
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
        {productosCompradosUser.length > 0 ? productosCompradosUser.map((productoCarrito, index) => (
          <div key={index} className="grid gap-4">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={null} alt={productoCarrito.nombre} className="rounded-md w-16 h-16 object-cover" />
                  <div>
                    <h3 className="text-lg font-medium">{productoCarrito.nombre}</h3>
                    <p className="text-muted-foreground text-sm">${productoCarrito.precio}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">Cantidad: {productoCarrito.cantidad}</p>
                  <p className="text-sm">Fecha: {new Date(productoCarrito.fechaCompra).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )) : <p>No hay productos comprados</p>}
      </div>
      <div>
        <h6>Ajustes</h6>
        <div onClick={cerrarSesion}> <p>Cerrar sesion</p></div>
         <div onClick={()=> deleteUser}>
          <p>eliminar cuenta</p>
         </div>
      </div>
    </div>
  );
};

export default Page;
