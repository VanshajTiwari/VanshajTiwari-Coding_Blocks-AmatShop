// src/redux/reducers.js
import { combineReducers } from 'redux';
// import cartReducer from '../features/cart/cartSlice';
const initialState = []

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle form submission
    case 'ADD_PRODUCT_SUCCESS':
        return state
    case 'UPDATE_PRODUCT_SUCCESS':
        return state
    case 'FETCH_PRODUCT_SUCCESS':
        return [...action.payload]
    case 'DELETE_PRODUCT_SUCCESS':
        return state
    default:
      return state;
  }
};

const UserReducer = (state = [], action ) => {
  switch (action.type) {
    case 'FETCH_ALL_USER_SUCCESS':
      return [...action.payload]
    case 'DELETE_USER_success':
      return state
    default:
      return state
  }
}


const OrderReducer = (state = [], action ) => {
  switch (action.type) {
    case 'FETCH_ALL_ORDER_SUCCESS':
      return [...action.payload]
    case 'FETCH_USER_ORDER_SUCCESS':
      return [...action.payload]
    default:
      return state
  }
}

const cartReducer = (state = [], action ) => {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      return state
    case 'FETCH_CART_SUCCESS':
      return [...action.payload]
    case 'REMOVE_FROM_CART_SUCCESS':
      return [...action.payload]
    case 'UPDATE_CART_SUCCESS':
      return [...action.payload]
    case 'LCHANGE_CART_QUANTITY_SUCCESS':
      return [...action.payload]
    default:
      return state
  }
}


// const updateProductReducer = (state = initialState, action) => {
//     switch (action.type) {
//       // Handle form submission
//       case 'UPDATE_PRODUCT_SUCCESS':
//         return [
//           ...state,
//           action.payload,
//         ];
//       default:
//         return state;
//     }
//   };

// const fetchProductReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // Handle fetching data
//     case 'FETCH_PRODUCT_SUCCESS':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const deleteProductReducer = (state = initialState, action) => {
//     switch (action.type) {
//       // Handle fetching data
//       case 'DELETE_PRODUCT_SUCCESS':
//         return action.payload;
//       default:
//         return state;
//     }
//   };

const rootReducer = combineReducers({
  product: ProductReducer,
  user: UserReducer,
  order: OrderReducer,
  cart: cartReducer,
});

export default rootReducer;
