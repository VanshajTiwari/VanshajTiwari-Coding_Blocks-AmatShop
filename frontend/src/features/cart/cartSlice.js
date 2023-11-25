import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: 'Nike Air Force 1 07 LV8',
      href: '#',
      price: 40,
      color: 'Orange',
      size: '8 UK',
      stock: 10,
      quantity: 1,
      imageSrc:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
    },
    {
      id: 2,
      name: 'Nike Blazer Low 77 SE',
      href: '#',
      price: 15,
      color: 'White',
      leadTime: '3-4 weeks',
      size: '8 UK',
      stock: 5,
      quantity: 1,
      imageSrc:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
    },
    {
      id: 3,
      name: 'Nike Air Max 90',
      href: '#',
      price: 22,
      color: 'Black',
      stock: 3,
      quantity: 1,
      imageSrc:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.stock > 0) {
        product.stock -= 1;
        product.quantity = (product.quantity || 0) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.stock += 1;
        product.quantity = Math.max((product.quantity || 0) - 1, 0);
      }
      if (product.quantity == 0) {
        console.log("remove product", productId)
        //creates the action by calling the removeProduct
        const removeAction = removeProduct({ productId: productId });
        //now the action is created now when we call the remove action it will update the state accordingly
        cartSlice.caseReducers.removeProduct(state, removeAction);
      }
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;
      state.products = state.products.filter(product => product.id !== productId);
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { incrementQuantity, decrementQuantity, removeProduct, addProduct } = cartSlice.actions;
export default cartSlice.reducer;
