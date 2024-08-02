export interface ApiProducto {
    id:number,
    nombre:string,
    precio:number
  }

export interface TypeCarrito  {
  id: number,
  name: string,
  description: string,
  price: number ,
  stock: number,
  available: boolean,
  createdAt: string,
  updatedAt: string
}
export interface ParamsTypes { 
  nombre:string
  valor:string
  diasParaExpirar : number 
 }