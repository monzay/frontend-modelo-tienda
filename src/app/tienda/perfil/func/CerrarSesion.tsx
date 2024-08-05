import React from 'react'
import { useRouter } from 'next/navigation'

export const cerrarSesion = () => {
  const router = useRouter()
  localStorage.removeItem("access_token")
  router.push("/")
}

const CerrarSesion = () => {
  return 
}

export default CerrarSesion