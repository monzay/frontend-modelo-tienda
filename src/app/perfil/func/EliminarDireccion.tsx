import {fetchUser} from "@/hooks/fetchUser"
export const eliminarDireccion = async (id: string, setDataUser:any) => {
  try {
    await fetchUser(`http://localhost:4000/api/address/${id}`, "DELETE");
    setDataUser((prev:any)  => ({
      ...prev,
      addresses: prev.addresses.filter((address:any) => address.id !== id)
    }));
  } catch (err) {
    console.error("Error al eliminar la dirección:", err);
  }
};