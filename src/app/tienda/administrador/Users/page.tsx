"use client"
import React, { useState, useEffect } from 'react'

// Definición de la interfaz Usuario que describe la estructura de los datos de usuario
interface Usuario {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

// Componente principal de la página
const Page = () => {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener los usuarios desde la API
    const obtenerUsuarios = async () => {
      try {
        // Obtiene el token de acceso del almacenamiento local
        const token = localStorage.getItem('access_token')
        // Realiza una petición GET a la API para obtener todos los usuarios
        const respuesta = await fetch('http://localhost:4000/api/user/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (respuesta.ok) {
          // Si la respuesta es exitosa, actualiza el estado con los datos recibidos
          const datos: Usuario[] = await respuesta.json()
          setUsuarios(datos)
        } else {
          console.error('Error al obtener usuarios')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    
    // Llama a la función para obtener usuarios
    obtenerUsuarios()
  }, []) // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente

  // Renderizado del componente
  return (
    <div className="w-full max-w-3xl mx-auto p-6 ">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Usuarios</h1>
    </div>
     {
       // Mapea la lista de usuarios para renderizar cada uno
       usuarios.map((user: Usuario) => ( 
          <div key={user.id} className="grid gap-4 pt-1 pb-1" >
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
            data-v0-t="card"
          >
            <div className="flex items-center justify-between" >
                 <div className="flex items-center  gap-2 "  >
                <img className="rounded-md" />
                <div>
                  <h3 className="text-lg font-medium"> {user.name} </h3>
                  <p className="text-muted-foreground text-sm">email: {user.email} </p>
                  <p className="text-muted-foreground text-sm">telefono: {user.phoneNumber} </p>
                </div>
              </div>
              <div className="text-right"></div>
            </div>
          </div>
        </div>
       ))
     }
  </div>
  )
}

// Exporta el componente Page como predeterminado
export default Page
