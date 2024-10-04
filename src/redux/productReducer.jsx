const initialState = {
    products: [], // Initialize as an empty array
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };

        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
            };

        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };

            case 'UPDATE_PRODUCT':
                return {
                    ...state,
                    products: state.products.map(product =>
                        product.id === action.payload.id 
                        ? { ...product, ...action.payload } // Update all properties from the payload
                        : product
                    ),
                };
            

        default:
            return state;
    }
};
