// productos : state,
// productoData : state
// setError : setState
// e : 
// url : ruta 
// params : id 


export async function updateProducto (url:string,productos:any,productoData:any,setError:any,params:any,e:any) {
    e.preventDefault();    
    const token = localStorage.getItem('access_token');
    const productoEncontrado = productos.find((producto: any) => producto.id == params.id);
    if (!productoEncontrado) {
      setError("Producto no encontrado");
      return;
    }


    const newData  = {
      name: productoData.name || productoEncontrado.name,
      description: productoData.description || productoEncontrado.description,
      price: productoData.price ? parseFloat(productoData.price) : productoEncontrado.price,
      stock: productoData.stock ? parseInt(productoData.stock) : productoEncontrado.stock
    };

    try {
      const respuesta = await fetch(url, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
      });
      const data = await respuesta.json();
      if (respuesta.ok) {
        setError("Producto actualizado con éxito");
      }else{
        setError("error al actualizar el producto ")
      }
     
    } catch (error) {
      console.log(error)
    }  
  }