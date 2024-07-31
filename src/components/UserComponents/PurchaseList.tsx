import React from 'react';
import { Purchase } from '../../dataTypes';
import ProductList from './ProductList';

interface PurchaseListProps {
  purchases: Purchase[];
}

const PurchaseList: React.FC<PurchaseListProps> = ({ purchases }) => (
  <div>
    <h2>Compras</h2>
    <ul>
      {purchases.map((purchase) => (
        <li key={purchase.id}>
          <p><strong>ID de Compra:</strong> {purchase.id}</p>
          <p><strong>Estado:</strong> {purchase.status}</p>
          <p><strong>Número de Seguimiento:</strong> {purchase.trackingNumber || 'N/A'}</p>
          <p><strong>Creado en:</strong> {new Date(purchase.createdAt).toLocaleString()}</p>
          <p><strong>Actualizado en:</strong> {new Date(purchase.updatedAt).toLocaleString()}</p>
          <ProductList products={purchase.products} />
        </li>
      ))}
    </ul>
  </div>
);

export default PurchaseList;
