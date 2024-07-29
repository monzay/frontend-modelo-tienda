export interface ApiProducto {
    id:number,
    nombre:string,
    precio:number
  }

export interface TypeCarrito {
  id:number,
  nombre:string,
  precio:number
}
export interface ParamsTypes { 
  nombre:string
  valor:string
  diasParaExpirar : number 
 }