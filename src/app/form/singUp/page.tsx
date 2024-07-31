"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importar desde next/navigation
import { Label } from "@/components/ui/form/label";
import { Input } from "@/components/ui/form/Input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";

interface SignUpTypes {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  celular: string;
}

export default function Page() {
  const [formData, setFormData] = useState<SignUpTypes>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    celular: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSend = {
      name: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.celular
    };

    try {
      const response = await fetch("http://localhost:4000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token); // Guarda el access_token en localStorage solo si no es indefinido
        router.push('/'); // Redirige al usuario al inicio
      } else {
        throw new Error('Registro fallido, no se recibió el token de acceso');
      }
    } catch (error: any) {
      console.error("Failed to create user:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div style={{ display: "flex", width: "100%", background: "black" }}>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Registrate
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Bienvenido, regístrate para poder acceder a todos nuestros productos.
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
            <Input id="celular" placeholder="123" type="tel" value={formData.celular} onChange={handleChange} />
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
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Enviar →'}
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
          ¿Ya tienes una cuenta? <Link style={{ color: "blue" }} href="/login">Iniciar sesión</Link>
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
