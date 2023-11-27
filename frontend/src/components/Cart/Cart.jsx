import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   incrementQuantity,
//   decrementQuantity,
// } from "../../features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { LchangeCartQuantity, fetchCart, removeFromCart, updateCart } from "../../redux/actions";
import { useState } from "react";

export function Cart() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [intendUP, setIntendUP] = useState(false)

  useEffect(() => {
    dispatch(fetchCart());
    console.log(cartProducts);
  }, [dispatch]);

  useEffect(() => {
    console.log("toupdate")
    clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      dispatch(updateCart(cartProducts))
    }, 1000); 
    setDebounceTimer(newTimer);
    return () => clearTimeout(newTimer);
  }, [intendUP])

  function removeCartItem(productId) {
    dispatch(removeFromCart({ productId }));
  }

  //Total Price Functionality for Checkout
  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const price = parseFloat(product.price);
      return total + price * product.quantity;
    }, 0);
  };
  const totalAmount = calculateTotalPrice();

  // Payment Gateway
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OCFDASDy7jxIvBgvDfWoUPHurUWL7Gevia9Ae8HXccjRTEP3IbaDseHJbtFj2rwS5PXaxudbATOPkvSPQ7wdp4Z00YJQhbkft"
    );
    const body = {
      products: cartProducts,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "http://localhost:3000/cart/create-checkout-session",
      body,
      { headers }
    );
    const session = response.data;
    const result = stripe
      .redirectToCheckout({
        sessionId: session.id,
      })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      {cartProducts.length == 0 ? (
        <div className="min-h-[51vh] relative">
          <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] font-bold text-">
            Sorry No items in your Cart
          </h1>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <ul role="list" className="divide-y divide-gray-200">
                {cartProducts.map((product, productIdx) => (
                  <div key={product._id} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:3000/upload/${product?.product?.image}`}
                          // alt={product?.product}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={product?.href}
                                  className="font-semibold text-black"
                                >
                                  {product?.product?.title}
                                </a>
                              </h3>
                            </div>
                            {/* <div className="mt-1 flex text-sm">
                                <p className="text-sm text-gray-500">{product.color}</p>
                                {product.size ? (
                                  <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null}
                              </div> */}
                            <div className="mt-1 flex items-end">
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp;&#8377;{product?.price}
                              </p>
                              &nbsp;&nbsp;
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() => {
                            dispatch(LchangeCartQuantity({ productId: product._id, val: -1, cartProducts}))
                            setIntendUP(!intendUP)
                          }}
                        >
                          {" "}
                          -{" "}
                        </button>

                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center focus:outline-none"
                          value={product.quantity || 0}
                          readOnly
                        />
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                          onClick={() => {
                            dispatch(LchangeCartQuantity({ productId: product._id, val: 1, cartProducts}))
                            setIntendUP(!intendUP)
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                        >
                          <Trash size={12} className="text-red-500" />
                          <span
                            className="text-xs font-medium text-red-500"
                            onClick={() => removeCartItem(product._id)}
                          >
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0 flex flex-col"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    {/* <dt className="text-sm text-gray-800">Price ({cartProducts.length} Items)</dt> */}
                    <dd className="text-sm font-medium text-gray-900">
                      &#8377;{totalAmount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      &#8377;{totalAmount}
                    </dd>
                  </div>
                </dl>
              </div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={makePayment}
              >
                CheckOut
              </button>
            </section>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
