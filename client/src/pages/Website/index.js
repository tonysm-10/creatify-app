import React from 'react';
import ProductList from './productList';
import './card.scss'

const Website = () => {
  return (
    <div>
      <nav className="header">
        <h1>Your Website</h1>
      </nav >
      <div className='card'>
        <ProductList />
      </div>
      
    </div>
  );
};

export default Website;
