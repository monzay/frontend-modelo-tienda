import { resourceUsage } from "process"

//  typar arrow funcintion 
const sumar = (a:number,b:number) : number => {
return a + b 
}


// never  (nunca va devolver nada)
 function theowError (mensaje:string) :never {
    throw new Error(mensaje)
}


// (devuelve cualquier cosa pero no le importa nada si tambien devuelve)
// function saludar (nombre:string): void{
//    const sa = nombre
//     return sa
// }


// type alias 
type Usuario = {
    nombre: string
    edad:number
}

const usuario : Usuario ={
    nombre:"joel",
    edad:324
}


//optional properties
// readonly no deja de mute el id (solo lo lee)
type Hero = {
    readonly id?:number
    nombre: string
    edad:number
    isActive?: boolean
}

const hero : Hero ={
    nombre:"joel",
    edad:324,
    }




// union 

type ssss = true | false 
let Annn: number | string;



//interception types
type Parte1 = {
    nombre:string
}

type Parte2 = {
    edad:number 
}

type Partecompleta = Parte1 & Parte2 // {nombre:string ,edad:number}




interface Producto {
    nombre: string;
    // otras propiedades si las hay...
  }
 const apiProductos: Producto[] = [
    { nombre: "Producto1" },
    { nombre: "Producto2" },
    { nombre: "Sdfsd" }
  ];


  let palabra: string = "sdf";

  function buscandoProducto(): void {
    if (!palabra) {
        return 
    }
    const productoEncontrado = apiProductos.filter((producto) =>
      producto.nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())
    );
    
  }
  
  buscandoProducto();



  //typos 
  // any[] en TypeScript es un tipo que representa un array que puede contener elementos de cualquier tipo. Vamos a desglosarlo: