import { fetchUser } from "@/hooks/fetchUser";

export const deleteDireccionUser = async (id: string, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    await fetchUser(`http://localhost:4000/api/address/${id}`, "DELETE");
    setState((prev: any[]) => prev.filter((dir: { id: string }) => dir.id !== id));
  } catch (err) {
    console.error("Error al eliminar la dirección:", err);
  }
};

