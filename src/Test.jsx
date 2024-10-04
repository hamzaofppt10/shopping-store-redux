import React from "react";
import axios from "axios";

const Test = () => {

    const updatedProduct = {
      title: "Updated Product Title",
      price: 120.50,
    };
    
    axios.put('https://dummyjson.com/products/1', updatedProduct)
      .then(response => {
        console.log('Product updated:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the product!', error);
      });
    
  return <div>Test</div>;
};

export default Test;
