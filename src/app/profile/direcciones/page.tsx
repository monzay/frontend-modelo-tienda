"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  addresses: { street: string; city: string; zip: string }[];
  name: string;
  email: string;
  phoneNumber: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

function decodeToken<T>(token: string): T {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload) as T;
}

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const [newAddress, setNewAddress] = useState({ street: '', city: '', zip: '' }); // Estado para la nueva dirección
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

  const handleAddAddress = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch('http://localhost:4000/address', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) {
        throw new Error('Failed to add new address');
      }

      const updatedProfile = { ...profile, addresses: [...profile.addresses, newAddress] };
      setProfile(updatedProfile);
      setShowForm(false);
      setNewAddress({ street: '', city: '', zip: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", width: "100%", background: "black", color: "white", padding: "20px" }}>
      {profile ? (
        <div>
          <h1>Perfil del Usuario</h1>
          <p><strong>Nombre:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Teléfono:</strong> {profile.phoneNumber}</p>
          <div>
            <ul>
              {profile.addresses.map((address, index) => (
                <li key={index}>
                  <p><strong>Calle:</strong> {address.street}</p>
                  <p><strong>Ciudad:</strong> {address.city}</p>
                  <p><strong>Código Postal:</strong> {address.zip}</p>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleAddAddress}>Añadir Dirección</button>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <h2>Nueva Dirección</h2>
              <label>
                Calle:
                <input type="text" name="street" value={newAddress.street} onChange={handleChange} required />
              </label>
              <label>
                Ciudad:
                <input type="text" name="city" value={newAddress.city} onChange={handleChange} required />
              </label>
              <label>
                Código Postal:
                <input type="text" name="zip" value={newAddress.zip} onChange={handleChange} required />
              </label>
              <button type="submit">Guardar Dirección</button>
            </form>
          )}
          {/* Muestra todos los datos en formato JSON para inspeccionarlos */}
        </div>
      ) : (
        <p>No se pudo cargar el perfil del usuario.</p>
      )}
    </div>
  );
}
