"use client"
import React, { useEffect, useState } from "react";
import { decodeToken, JwtPayload } from "@/dataTypes";

const Page = () => {
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zipCode: '' });
  const [credencialesUser, setCredencialesUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const decodedToken = decodeToken<JwtPayload>(token);
        const userId = decodedToken.sub;
        
        const res = await fetch(`http://localhost:4000/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error('Failed to fetch user profile');
        }
        setCredencialesUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);


  // FUNCION PARA OBTENER LOS DATOS NO FUNCIONA 
  useEffect(() => {
    const GetProductoUser = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const res = await fetch(`http://localhost:4000/api/purchase-product/my-purchases`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error('Failed to fetch user profile');
        }
        console.log(data)
      } catch (err) {
        console.log(err)
      } 
    }
    GetProductoUser()
  }, [])
  

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

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div>
        <h1>Perfil</h1>
        <span>nombre: {credencialesUser.name}</span><br />
        <span>email: {credencialesUser.email}</span><br />
      </div>
      <div>
       <h1>
          Direccion
       </h1>
       <span>tu ubicacion se pondra cuando compres algo </span> <br />
       <span>calle: ....</span> <br />
       <span>cuidad: ....</span> <br />
       <span>estado o provincia: ....</span> <br />
       <span>codigo postal: ....</span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis Compras</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filtrar
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
            >
              <line x1="10" x2="21" y1="6" y2="6"></line>
              <line x1="10" x2="21" y1="12" y2="12"></line>
              <line x1="10" x2="21" y1="18" y2="18"></line>
              <path d="M4 6h1v4"></path>
              <path d="M4 10h2"></path>
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
            </svg>
            Ordenar
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {
          [].map(productos => (
            <div
              key={productos.id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    alt="Bolso de cuero"
                    width="64"
                    height="64"
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium">nombre </h3>
                    <p className="text-muted-foreground text-sm">$precio </p>
                  </div>
                </div>
                <div className="text-right"></div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Page;
