export async function deleteProducto(url: string, metodo: string, setState: any, state: any, id: number) {
    const token = localStorage.getItem('access_token');
    try {
      const respuesta = await fetch(`${url}/${id}`, {
        method: metodo,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (respuesta.ok) {
        setState(state.filter((producto: any) => producto.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }