import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_STORE, UPDATE_STORE, DELETE_STORE } from '../../utils/mutations';

const StoreForm = ({ store, onUpdate, onDelete }) => {
  const [storeName, setStoreName] = useState(store ? store.storeName : '');
  const [colorBackground, setColorBackground] = useState(store ? store.colorBackground : '');
  const [phoneNumber, setPhoneNumber] = useState(store ? store.phoneNumber : '');
  const [email, setEmail] = useState(store ? store.email : '');

  const [createStore] = useMutation(CREATE_STORE);
  const [updateStore] = useMutation(UPDATE_STORE);
  const [deleteStore] = useMutation(DELETE_STORE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (store) {
      // Update store
      await updateStore({
        variables: {
          storeId: store.id,
          storeName,
          colorBackground,
          phoneNumber,
          email,
        },
      });
      onUpdate();
    } else {
      // Create store
      await createStore({
        variables: {
          storeName,
          colorBackground,
          phoneNumber,
          email,
        },
      });
      setStoreName('');
      setColorBackground('');
      setPhoneNumber('');
      setEmail('');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      await deleteStore({
        variables: {
          storeId: store.id,
        },
      });
      onDelete();
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Store Name:</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <label>Color Background:</label>
        <input
          type="text"
          value={colorBackground}
          onChange={(e) => setColorBackground(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{store ? 'Update Store' : 'Create Store'}</button>
        {store && (
          <button type="button" onClick={handleDelete}>
            Delete Store
          </button>
        )}
      </form>
    </div>
  );
};

export default StoreForm;