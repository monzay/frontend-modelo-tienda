import React from 'react';
import { UserProfile } from '../../dataTypes';

interface AddressListProps {
  addresses: UserProfile['addresses'];
}

const AddressList: React.FC<AddressListProps> = ({ addresses }) => (
  <div>
    <h2>Direcciones</h2>
    <ul>
      {addresses.map((address, index) => (
        <li key={index}>
          <p><strong>Calle:</strong> {address.street}</p>
          <p><strong>Ciudad:</strong> {address.city}</p>
          <p><strong>Estado:</strong> {address.state}</p>
          <p><strong>Código Postal:</strong> {address.zipCode}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default AddressList;
