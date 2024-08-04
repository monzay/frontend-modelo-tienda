"use client"
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const respuesta = await fetch('http://localhost:4000/api/user/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (respuesta.ok) {
          const datos = await respuesta.json()
          setUsuarios(datos)
        } else {
          console.error('Error al obtener usuarios')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    
    obtenerUsuarios()
  }, [])

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const respuesta = await fetch('http://localhost:4000/api/user/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (respuesta.ok) {
          const datos = await respuesta.json()
          setUsuarios(datos)
        } else {
          console.error('Error al obtener usuarios')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    
    obtenerUsuarios()
  }, [])



  return (
    <div className="w-full max-w-3xl mx-auto p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Usuarios</h1>
    </div>
     {
       usuarios.map(user => ( 
          <div className="grid gap-4">
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

export default Page
