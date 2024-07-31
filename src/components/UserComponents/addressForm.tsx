import React from 'react';

interface AddressFormProps {
  newAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ newAddress, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva Dirección</h2>
      <label>
        Calle:
        <input type="text" name="street" value={newAddress.street} onChange={handleChange} required />
      </label>
      <label>
        <label>
        Colonia :
        <input type="text" name="street" value={newAddress.street} onChange={handleChange} required />
      </label>
        Ciudad:
        <input type="text" name="city" value={newAddress.city} onChange={handleChange} required />
      </label>
      <label>
        Estado:
        <input type="text" name="state" value={newAddress.state} onChange={handleChange} required />
      </label>
      <label>
        Código Postal:
        <input type="text" name="zipCode" value={newAddress.zipCode} onChange={handleChange} required />
      </label>
      <button type="submit">Guardar Dirección</button>
    </form>
  );
};

export default AddressForm;
