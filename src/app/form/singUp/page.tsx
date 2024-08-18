"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importar desde next/navigation
import { Label } from "@/components/ui/form/label";
import { Input } from "@/components/ui/form/Input";
import { cn } from "@/lib/utils";
import { createReactComponent, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { obtenerToken, redirecionar } from "@/app/funciones";

interface SignUpTypes {
  email: string;
  password: string;
}

export default function Page() {

  const [credenciales, setCredenciales] = useState<SignUpTypes>({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  


  //////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message)
      }
      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token); 
        router.push('/tienda');
      }
      
    } catch (err: any) {
      throw new Error(err)
   
    } finally {
      setLoading(false);
    }
    
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredenciales({
      ...credenciales,
      [e.target.id]: e.target.value,
    });
  };
  
  useEffect(() => {
    // si retorna el token lo redireciona y si tira undefine no se ejecuta 
    if(obtenerToken("access_token")){
      redirecionar("/tienda",router)
    }
  }, [])
  


   //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div style={{ width: "100%", height: "100vh", background: "black", alignItems: "center", paddingTop: "40px" }}>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Iniciar sesión</h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Inicia sesión para para acceder a nuestros productos
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredenciales((prev) => ({ ...prev, email: e.target.value }))}
              id="email"
              placeholder="ejemplo@gmail.com"
              type="email"
              value={credenciales.email}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredenciales((prev) => ({ ...prev, password: e.target.value }))}
              id="password"
              placeholder="••••••••"
              type="password"
              value={credenciales.password}
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Sign up →'}
            <BottomGradient />
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
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
        <p style={{ color: "white" }}>
          ¿No tienes una cuenta? <Link href="/from/login" replace={true} >Regístrate</Link>
        </p>
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

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};