import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../../utils/mutations';
import './Carousel.scss';

const ProductForm = ({ product, onUpdate, onDelete }) => {
  const questions = [
    { question: 'What is the product name?', key: 'name' },
    { question: 'What is the product description?', key: 'description' },
    { question: 'What is the product price?', key: 'price' },
    { question: 'What is the product quantity?', key: 'quantity' },
    { question: 'What is the product category?', key: 'category' },
    { question: 'What is the product image?', key: 'image' },
  ];

  const initialValues = product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      }
    : {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      };

  const [values, setValues] = useState(initialValues);

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswerChange = (key, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const { name, description, price, quantity, category, image } = values;
  
    // Obtain the store ID or retrieve it from your application's state
    const storeId = '6463f0429a64f0d28eae0004'; // Replace with the actual store ID
  
    if (product) {
      // Update product
      await updateProduct({
        variables: {
          productId: product.id,
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category,
          image,
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
          category,
          image,
          storeId,
        },
      });
      setValues(initialValues);
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

  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevQuestion = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="product">
      <form onSubmit={handleFormSubmit}>
        {/* Form fields */}
        <button type="submit" className="primary-button">
          {product ? 'Update Product' : 'Create Product'}
        </button>
        {product && (
          <button className="danger-button" onClick={handleDelete}>
            Delete Product
          </button>
        )}
      </form>

      <div className="carousel" id="question-carousel">
        <div className="slides">
          {questions.map((question, index) => (
            <div
              className={`slide ${currentIndex === index ? 'active' : ''}`}
              key={index}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <h3>{question.question}</h3>
              <input
                type="text"
                className="answer-input"
                value={values[question.key]}
                onChange={(e) => handleAnswerChange(question.key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="prev-button" onClick={handlePrevQuestion} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          className="next-button"
          onClick={handleNextQuestion}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductForm;




