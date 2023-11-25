// src/redux/sagas.js
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_PRODUCTS, ADD_TO_CART, DELETE_PRODUCTS, DELETE_USERS, FETCH_ALL_ORDERS, FETCH_ALL_USERS, FETCH_CART, FETCH_PRODUCTS, LCHANGE_CART_QUANTITY, REMOVE_FROM_CART, UPDATE_CART, UPDATE_PRODUCTS } from './actions';

// Worker Saga: Handles form submission
function* addProductSaga(action) {
  try {
    // Simulate API call
    const response = yield call(axios.post, 'http://localhost:3000/product/addProduct', action.payload, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        },
    }, { withCredentials: true});
    yield put({ type: 'ADD_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'ADD_PRODUCT_FAILURE', payload: error.message });
  }
}

function* updateProductSaga(action) {
    try {
      // Simulate API call
    //   console.log(action.payload)
      const response = yield call(axios.post, `http://localhost:3000/product/updateProduct:${action.payload.get('_id')}`, action.payload, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }, { withCredentials: true});
      yield put({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
    } catch (error) {
      yield put({ type: 'UPDATE_PRODUCT_FAILURE', payload: error.message });
    }
  }

// Worker Saga: Handles data fetching
function* fetchProductSaga() {
  try {
    // Simulate API call
    const response = yield call(axios.get, 'http://localhost:3000/product', { withCredentials: true});
    yield put({ type: 'FETCH_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_PRODUCT_FAILURE', payload: error.message });
  }
}

function* deleteProductSaga(action) {
    try {
      // Simulate API call
      const response = yield call(axios.post, `http://localhost:3000/product/deleteProduct:${action.payload}`, { withCredentials: true});
      yield put({ type: 'DELETE_PRODUCT_SUCCESS', payload: response.data });
    } catch (error) {
      yield put({ type: 'DELETE_PRODUCT_FAILURE', payload: error.message });
    }
  }

function* fetchAllUserSaga() {
  try {
    // Simulate API call
    const response = yield call(axios.get, 'http://localhost:3000/user', { withCredentials: true});
    yield put({ type: 'FETCH_ALL_USER_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_ALL_USER_FAILURE', payload: error.message });
  }
}

function* deleteUserSaga(action) {
  try {
    // Simulate API call
    const response = yield call(axios.post, `http://localhost:3000/user/deleteUser:${action.payload}`, { withCredentials: true});
    yield put({ type: 'DELETE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'DELETE_USER_FAILURE', payload: error.message });
  }
}

function* fetchAllOrderSaga() {
  try {
    // Simulate API call
    const response = yield call(axios.get, 'http://localhost:3000/order', { withCredentials: true});
    yield put({ type: 'FETCH_ALL_ORDER_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_ALL_ORDER_FAILURE', payload: error.message });
  }
}

function* addToCart(action) {
  try {
    console.log(action)
    const response = yield call(axios.post, 'http://localhost:3000/cart/addToCart', {product: action.payload._id, quantity: action.payload.quantity ? action.payload.quantity : 1 }, { withCredentials: true});
    yield put({ type: 'ADD_TO_CART_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'ADD_TO_CART_FAILURE', payload: error.message });
  }
}

function* fetchCart() {
  try {
    // Simulate API call
    const response = yield call(axios.get, 'http://localhost:3000/cart/', { withCredentials: true});
    yield put({ type: 'FETCH_CART_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_CART_FAILURE', payload: error.message });
  }
}

function* removeFromCart(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/cart/removeFromCart', {product: action.payload.productId},  { withCredentials: true});
    yield put({ type: 'REMOVE_FROM_CART_SUCCESS', payload: response.data });
  }catch (error) {
    yield put({ type: 'REMOVE_FROM_CART_FAILURE', payload: error.message })
  }
}

function* updateCart(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/cart/updateCartItem', {data: action.payload},  { withCredentials: true});
    yield put({ type: 'REMOVE_FROM_CART_SUCCESS', payload: response.data });
  }catch (error) {
    yield put({ type: 'REMOVE_FROM_CART_FAILURE', payload: error.message })
  }
}

function* LchangeCartQuantity(action){
  try {
    const {productId, val, cartProducts} = action.payload;
    console.log(productId, val);
    cartProducts.forEach((Item) => {
      if (Item._id == productId) {
        if (val > 0) {
          if (Item && Item.product.stock > 0) {
            Item.product.stock -= 1;
            Item.quantity += 1;
          }
        } else {
          if (Item && Item.quantity > 0) {
            Item.product.stock += 1;
            Item.quantity -= 1;
          }
        }
      }
    });
    console.log(cartProducts)
    yield put({ type: 'LCHANGE_CART_QUANTITY_SUCCESS', payload: cartProducts });
  }catch (error) {
    yield put({ type: 'LCHANGE_CART_QUANTITY_SUCCESS', payload: error.message })
  }
}

function* rootSaga() {
  yield takeEvery(ADD_PRODUCTS, addProductSaga);
  yield takeEvery(UPDATE_PRODUCTS, updateProductSaga);
  yield takeEvery(FETCH_PRODUCTS, fetchProductSaga);
  yield takeEvery(DELETE_PRODUCTS, deleteProductSaga);
  yield takeEvery(FETCH_ALL_USERS, fetchAllUserSaga);
  yield takeEvery(DELETE_USERS, deleteUserSaga);
  yield takeEvery(FETCH_ALL_ORDERS, fetchAllOrderSaga);
  yield takeEvery(ADD_TO_CART, addToCart);
  yield takeEvery(FETCH_CART, fetchCart);
  yield takeEvery(REMOVE_FROM_CART, removeFromCart)
  yield takeEvery(UPDATE_CART, updateCart);
  yield takeEvery(LCHANGE_CART_QUANTITY, LchangeCartQuantity)
}

export default rootSaga;
