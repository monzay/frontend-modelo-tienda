import { fetchUser } from "@/hooks/fetchUser";

export const deleteDireccionUser = async (id: string, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    await fetchUser(`http://localhost:4000/api/address/${id}`, "DELETE");
    setState((prev: any[]) => prev.filter((dir: { id: string }) => dir.id !== id));
  } catch (err) {
    console.error("Error al eliminar la dirección:", err);
  }
};

// Comentarios sobre los cambios realizados:
// 1. Se agregó el tipo 'React.Dispatch<React.SetStateAction<any[]>>' para el parámetro 'setState'.
// 2. Se especificó el tipo 'any[]' para el parámetro 'prev' en la función de actualización del estado.
// 3. Se agregó una anotación de tipo '{ id: string }' para el parámetro 'dir' en la función filter.
// 4. Se cambió 'console.log(err)' por 'console.error("Error al eliminar la dirección:", err)' para una mejor gestión de errores.
// 5. Se mantuvo la estructura general de la función y su lógica principal.