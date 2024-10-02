export const deleteProduct = id => ({
    type: 'DELETE_PRODUCT',
    payload: id,
  });
  
  export const addToCart = product => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const increment = id => ({
    type: 'INCREMENT',
    payload: id,
  });
  
  export const decrement = id => ({
    type: 'DECREMENT',
    payload: id,
  });
  