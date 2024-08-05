import { decodeToken,JwtPayload } from "@/dataTypes";
import { fetchUser } from "@/hooks/fetchUser";
import { useRouter } from "next/navigation";


export const deleteUser = async () => {
    const router = useRouter()
    const token = localStorage.getItem("access_token");
    if (!token) {
      return;
    }
    const decodedToken = decodeToken<JwtPayload>(token);
    try {
      await fetchUser(`http://localhost:4000/api/user/${decodedToken.id}`, "DELETE");
      router.push("/");
      localStorage.removeItem("access_token");
    } catch (err) {
      console.log(err);
    }
  };
  
const EliminarUser = () => {
  return 
}
export default deleteUser
