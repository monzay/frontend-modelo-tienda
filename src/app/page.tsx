"use client"
import Button from '@/components/ui/btn/button'
import { Carusel } from '@/components/ui/carusel/Carusel'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState} from 'react'


const page = () => {
   const router = useRouter()
   const [mostrarBtnForm,setMostrarBtnForm] = useState(true)

  function redireccionarAlLogin(){
    router.push("/form/login")
  }
  
  function redirecionarSingUo(){
    router.push("/form/singUp")
  }

  function redireccion(){
    const token = localStorage.getItem("access_token")
    if(token){
      router.push("/tienda")
    }else{
       router.push("/form/login")
    }
  }

useEffect(() => {
  const token = localStorage.getItem("access_token")
  if(token){
    setMostrarBtnForm(false)
  }
}, [])


  useEffect(() => {
    const elementoDom = document.getElementById("titulo");
    if (elementoDom) {
      const frase = "ienvenido a metamorfosis";
      let index = 0;
      const interval = setInterval(() => {
        if (index < frase.length) {
          elementoDom.textContent += frase[index];
          index++;
        } else {
          clearInterval(interval);
        }
      },50);
  
      // Limpieza del efecto
      return () => clearInterval(interval);
    }
  }, []);
  


  
  return (
<div  style={{display:"flex",width:"100%",flexDirection:'column'}} className="flex flex-col min-h-screen">
  <header className="bg-primary text-primary-foreground py-4 px-4 sm:px-6 md:px-8 flex items-center justify-between">
    <a className="text-2xl font-bold" href="#">
     metamorfosis 
    </a>
    <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
     {
      mostrarBtnForm && (
       <div>
         <Button txt='iniciar sesion'click={redirecionarSingUo} ></Button>
         <Button txt='resgistrame' click={redireccionarAlLogin} ></Button>
       </div>
      )
     }
    </nav>
  </header>
  <main className="flex-1">
    <section className="bg-[url('/hero-image.jpg')] bg-cover bg-center py-20 px-4 sm:py-32 sm:px-6 md:px-8 flex items-center justify-center text-center">
      <div className="max-w-3xl space-y-6">
        <h1 id="titulo" className="text-3xl  sm:text-4xl md:text-6xl font-bold text-primary-foreground">
         B
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-primary-foreground">
          Disfruta de una experiencia culinaria excepcional en un ambiente elegante y relajado.
        </p>
        <button onClick={redireccion} id="btn-seccion-portada">Tienda</button>
      </div>
    </section>
    <section>
      <Carusel>
      </Carusel>
    </section>
    <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Sobre Nosotros</h2>
          <p className="text-muted-foreground">
            Restaurante Moderno es un lugar donde la excelencia culinaria se combina con un ambiente acogedor y
            elegante. Nuestro equipo de chefs expertos crea platos innovadores utilizando los mejores ingredientes
            frescos y de temporada.
          </p>
          <p className="text-muted-foreground">
            Nos enorgullece ofrecer una experiencia gastronómica excepcional, con un servicio atento y
            personalizado. Visítanos y déjate sorprender por nuestros sabores únicos.
          </p>
        </div>
      </div>
    </section>
  </main>
  <footer className="flex flex-col bg-primary text-primary-foreground py-4 sm:py-6 px-4 sm:px-6 md:px-8  items-center justify-between">
    <p className="text-sm">© 2024 Tienda .Todos los derechos reservado</p>
  </footer>
</div>
  )
}

export default page