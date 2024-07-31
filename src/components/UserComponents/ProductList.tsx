import React from 'react';
import { Product } from '../../dataTypes';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div>
    <h3>Productos</h3>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <p><strong>Nombre:</strong> {product.name}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
