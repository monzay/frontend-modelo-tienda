export const fetchUser = async (url: string, metodo: string, body?: any) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("El usuario no está autenticado");
      }
      const res = await fetch(url, {
        method: metodo,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.log(error)
      console.error("Error:", error);
    }
  };
