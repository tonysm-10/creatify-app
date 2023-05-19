import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import './card.scss';
import ProductCard from './productCard';

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

  const storeInfo = user.stores[0]?.storeInfo;

  if (!storeInfo) {
    return <p>Store information not found</p>;
  }

  const products = user.stores.flatMap((store) => store.products);

  return (
    <div>
      <h1>{storeInfo.storeName}</h1>
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
      {/* Use storeInfo here */}
      <footer>
        <div>{storeInfo.phoneNumber}</div>
        <div>{storeInfo.email}</div>
      </footer>
    </div>
  );
};



export default ProductList