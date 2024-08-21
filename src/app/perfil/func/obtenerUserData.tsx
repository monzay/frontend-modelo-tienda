import { decodeToken } from "@/dataTypes";
import { JwtPayload } from "jwt-decode";
import { fetchUser } from "@/hooks/fetchUser";

export const obtenerUserData = async (setLoading: any, setDataUser: any) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const decodedToken = decodeToken<JwtPayload>(token);
      const userId = decodedToken.sub;
      const res = await fetchUser(`http://localhost:4000/api/user/${userId}`, "GET");
      if (res) {
        setDataUser((prev: any) => ({
          ...prev,
          name: res.name,
          email: res.email,
          role: res.role,
          phoneNumber: res.phoneNumber,
          addresses: res.addresses,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };