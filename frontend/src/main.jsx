// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import { Provider } from 'react-redux';
// import store from './app/store.js';
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import Cart from './components/Cart/Cart.jsx'
import Orders from './components/Orders.jsx'
import Products from './components/Products.jsx'
import Mail from './components/forgotPass/Mail.jsx'
import NewPass from './components/forgotPass/NewPass.jsx'
import Profile from './components/Profile.jsx'
import Success from './components/Cart/Success.jsx';
import Cancel from './components/Cart/Cancel.jsx';
import ProductView from './components/ProductView.jsx';
import ResponsiveDrawer from './admin/sidenav.jsx'
import AddProduct from './admin/product/addProduct.jsx'
import ViewUser from './admin/user/viewUser';
import ViewOrder from './admin/order/viewOrder';
import ViewProuct from './admin/product/viewProuct';
import UpdateProduct from './admin/product/updateProduct';

import { Provider } from 'react-redux';
import store from './redux/store';
import AdminLayout from './AdminLayout.jsx'

const isAdmin=false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    { !isAdmin?(
      <Route path='/' element={<Layout />}>
        {/* <Route index element={<Home />} /> */}
        <Route path='/SignIn' element={<SignIn />} />
        <Route index element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Order' element={<Orders />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/ProductView' element={<ProductView />} />
        <Route path='/Forgetpass' element={<Mail />} />
        <Route path='/Forgetpass/newPass' element={<NewPass />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />


        {/* <Route path="/admin/p" element={ <ViewProuct /> } />
          <Route path="/admin/up" element={ <UpdateProduct /> } />
          <Route path="/admin/ap" element={ <AddProduct /> } />
          <Route path="/admin/u" element={ <ViewUser /> } />
          <Route path="/admin/o" element={ <ViewOrder /> } /> */}
      </Route>):(
      <Route path='/' element={<AdminLayout />}>
        <Route index element={<ResponsiveDrawer />} />
        <Route path="/admin/p" element={<ViewProuct />} />
        <Route path="/admin/up" element={<UpdateProduct />} />
        <Route path="/admin/ap" element={<AddProduct />} />
        <Route path="/admin/u" element={<ViewUser />} />
        <Route path="/admin/o" element={<ViewOrder />} /> 
      </Route>)
    }
    </>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
