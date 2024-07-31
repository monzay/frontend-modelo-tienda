"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/form/label";
import { Input } from "@/components/ui/form/Input";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { ParamsTypes } from "@/app/typo/interfaces";
import Link from "next/link";






export default function page () {
   //ESTADOS
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    celular: ""
  });

  ///////////////////////////////////////////////////////////////////
  //FUNCIONES
 
  function  setCookies ({nombre,valor,diasParaExpirar} : ParamsTypes ) : void{
    const d = new Date ()
    // Calcula la fecha de expiración sumando los días especificados
    d.setTime(d.getTime() + (diasParaExpirar * 24 * 60 * 60 * 1000 ))
    // Formatea la fecha de expiración como una cadena UTC
    let expire = "expires=" + d.toUTCString()
    // Establece la cookie con el nombre, valor y fecha de expiración
    document.cookie = nombre + "="  + valor  + ";" + expire
  }
  function getCookies ({nombre}:{nombre:string}) : any {
    let nombreEQ = nombre + "="
    let ca = document.cookie.split(";")
    // Recorre todas las cookies
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      // Elimina los espacios en blanco al inicio de la cookie
      while (c.charAt(0) == ' ') c = c.substring(1);
      // Si encuentra la cookie buscada, devuelve su valor
      if (c.indexOf(nombreEQ) == 0) return c.substring(nombreEQ.length, c.length);
    }
    // Si no encuentra la cookie, devuelve una cadena vacía
    return "";
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      name: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      password: formData.password,
      phoneNumber: '30405050'
    };

    try {
      const token = getCookies({nombre: "token"});
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": token, // Añade el token CSRF aquí
        },
        body: JSON.stringify(dataToSend),
       credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      console.log("User created successfully");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
   ///////////////////////////////////////////////////////////////////
   // hoock

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:4000/csrf-token', {
          credentials: 'include' // Asegúrate de que las cookies se envíen con la solicitud
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // guardamos el token el las cookies
        setCookies({
          nombre: "token",
          valor: data.csrfToken,
          diasParaExpirar: 1
        });
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <div style={{display:"flex",width:"100%",background:"black"}}>
        <div   className=" max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Registrate
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      Bienvenido registrate para poder acceder a todos nuestro porductos 
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Nombre</Label>
            <Input id="firstname" placeholder="Nombre" type="text" value={formData.firstname} onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Apellido</Label>
            <Input id="lastname" placeholder="Apellido" type="text" value={formData.lastname} onChange={handleChange} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Ejemplo@gmail.com" type="email" value={formData.email} onChange={handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="celular">Celular</Label>
          <Input id="celular"  placeholder="123" type="celular" value={formData.celular} onChange={handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Repite la contraseña</Label>
          <Input id="confirmPassword" placeholder="••••••••" type="password" value={formData.confirmPassword} onChange={handleChange} />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Enviar &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <p style={{color:"white"}}>ya tenes una cuenta <Link style={{color:"blue"}} href="./singUp"> Iniciar sesion</Link> </p>
    </div>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};