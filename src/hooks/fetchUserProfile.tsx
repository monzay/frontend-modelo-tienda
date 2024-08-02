import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JwtPayload } from 'jwt-decode';
import { UserProfile } from '@/dataTypes';
import { decodeToken } from '@/dataTypes';
const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const decodedToken = decodeToken<JwtPayload>(token); // Decodifica el token manualmente
        const userId = decodedToken.sub;
        
        const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        console.log('Datos completos del perfil del usuario:', data); // Imprime los datos completos en la consola
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
        localStorage.removeItem('access_token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  return { profile, loading, error, setProfile, setError };
};

export default useUserProfile;
