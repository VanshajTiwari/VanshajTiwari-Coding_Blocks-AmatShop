// src/redux/actions.js
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const DELETE_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const DELETE_USERS = 'DELETE_USERS'
export const FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS';
export const ADD_TO_CART = 'ADD_TO_CART'
export const FETCH_CART = 'FETCH_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const LCHANGE_CART_QUANTITY = 'LCHANGE_CART_QUANTITY'

export const addProducts = (formData) => ({
  type: ADD_PRODUCTS,
  payload: formData,
});

export const updateProducts = (formData) => ({
    type: UPDATE_PRODUCTS,
    payload: formData,
  });

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
});

export const deleteProducts = (formData) => ({
    type: DELETE_PRODUCTS,
    payload: formData,
  });

export const fetchAllUsers = () => ({
  type: FETCH_ALL_USERS,
});

export const deleteUsers = (formData) => ({
  type: DELETE_USERS,
  payload: formData,
});

export const fetchAllOrders = () => ({
  type: FETCH_ALL_ORDERS,
});

export const addToCart = (prod) => ({
  type: ADD_TO_CART,
  payload: prod
})

export const fetchCart = () => ({
  type: FETCH_CART,
})

export const removeFromCart = (prod) => ({
  type: REMOVE_FROM_CART,
  payload: prod
})

export const updateCart = (prod) => ({
  type: UPDATE_CART,
  payload: prod
})

export const LchangeCartQuantity = (prod) => ({
  type: LCHANGE_CART_QUANTITY,
  payload: prod
})