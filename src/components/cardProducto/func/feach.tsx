export const feach = async (url: string, metodo: string, cuerpo?: any, id?: number) => {
    const token = localStorage.getItem('access_token');
    try {
      const opciones: RequestInit = {
        method: metodo,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      if (cuerpo) {
        opciones.body = JSON.stringify(cuerpo);
      }
      
      if (id) {
        url = `${url}/${id}`;
      }
      
      const respuesta = await fetch(url, opciones);
      if (!respuesta.ok) {
        throw new Error('Error al obtener los datos');
      }
      return await respuesta.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };