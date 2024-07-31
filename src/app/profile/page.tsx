"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayload, decodeToken } from '../../dataTypes';
import useUserProfile from "@/hooks/fetchUserProfile";
import AddressList from '../../components/UserComponents/AddresList';
import PurchaseList from '../../components/UserComponents/PurchaseList';
import AddressForm from '../../components/UserComponents/addressForm';

export default function Page() {
  const { profile, loading, error, setProfile, setError } = useUserProfile(); // Usar el hook personalizado
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zipCode: '' }); // Estado para la nueva dirección
  const router = useRouter();

  const handleAddAddress = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const token = localStorage.getItem('access_token');
      const decodedToken = decodeToken<JwtPayload>(token!);
      const userId = decodedToken.sub;

      const response = await fetch('http://localhost:4000/address', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newAddress, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add new address');
      }

      const updatedProfile = { ...profile, addresses: [...profile.addresses, newAddress] };
      setProfile(updatedProfile);
      setShowForm(false);
      setNewAddress({ street: '', city: '', state: '', zipCode: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <AddressList addresses={profile.addresses} />
          <button onClick={handleAddAddress}>Añadir Dirección</button>
          {showForm && (
            <AddressForm 
              newAddress={newAddress} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
            />
          )}
          <PurchaseList purchases={profile.purchases} />
        </div>
      ) : (
        <p>No se pudo cargar el perfil del usuario.</p>
      )}
    </div>
  );
}
