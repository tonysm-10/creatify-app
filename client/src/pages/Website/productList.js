import React, { useState } from 'react';
import ProductCard from './productCard';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

const ProductList = () => {
  const [username, setUsername] = useState('');

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  if (!user) {
    return (
      <div>
        <p>User not found</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setUsername(username)}>Submit</button>
      </div>
    );
  }

  const products = user.stores.flatMap((store) => store.products);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          quantity={product.quantity}
          category={product.category}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductList;

