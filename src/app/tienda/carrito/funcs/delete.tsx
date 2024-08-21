export function deleteProductoCarrito(id: number, setCarrito: any) {
  setCarrito((prev: any) =>
    prev.filter((producto:any) => producto.id !== id)
  );
  const carrtoExistente = localStorage.getItem("carrito")
  if(carrtoExistente){
    const data = JSON.parse(carrtoExistente) 
    const nuevosProductos = data.filter((producto:any) => producto.id !== id)
    localStorage.setItem("carrito",JSON.stringify(nuevosProductos))
  }
}
