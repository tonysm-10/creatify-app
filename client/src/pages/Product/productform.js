import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../../utils/mutations';

const ProductForm = ({ product, onUpdate, onDelete }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price : 0);
  const [quantity, setQuantity] = useState(product ? product.quantity : 0);

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (product) {
      // Update product
      await updateProduct({
        variables: {
          productId: product.id,
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });
      onUpdate();
    } else {
      // Create product
      await createProduct({
        variables: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });
      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct({
        variables: {
          productId: product.id,
        },
      });
      onDelete();
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">{product ? 'Update Product' : 'Create Product'}</button>
        {product && (
          <button type="button" onClick={handleDelete}>
            Delete Product
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;