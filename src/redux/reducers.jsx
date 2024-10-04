const initialState = {
  cart: [],
  products : fetch("https://dummyjson.com/products")
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.cart.find(
        (el) => el.id === action.payload.id
      );
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((el) =>
            el.id === existingProduct.id
              ? { ...el, quantity: el.quantity + 1 }
              : el
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT": {
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload && item.quantity > 0
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0), 
      };
    }

    case "DELETE_PRODUCT":
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
