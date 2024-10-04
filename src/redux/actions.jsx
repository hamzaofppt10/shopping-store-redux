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
  

  // redux/actions.js
export const fetchProducts = () => {
  return (dispatch) => {
      fetch("https://dummyjson.com/products")
          .then((res) => res.json())
          .then((data) => {
              dispatch({
                  type: 'SET_PRODUCTS',
                  payload: data.products,
              });
          })
          .catch((error) => {
              console.error("Error fetching products:", error);
          });
  };
};
