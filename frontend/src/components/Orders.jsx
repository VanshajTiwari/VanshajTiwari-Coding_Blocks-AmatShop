// import React from 'react'
// import { X } from 'lucide-react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrder } from "../redux/actions";

// const products = [
//   {
//     id: 1,
//     name: 'Nike Air Force 1 07 LV8',
//     href: '#',
//     price: '₹47,199',
//     originalPrice: '₹48,900',
//     discount: '5% Off',
//     color: 'Orange',
//     size: '8 UK',
//     imageSrc:
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
//   },
//   {
//     id: 2,
//     name: 'Nike Blazer Low 77 SE',
//     href: '#',
//     price: '₹1,549',
//     originalPrice: '₹2,499',
//     discount: '38% off',
//     color: 'White',
//     leadTime: '3-4 weeks',
//     size: '8 UK',
//     imageSrc:
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
//   },
//   {
//     id: 3,
//     name: 'Nike Air Max 90',
//     href: '#',
//     price: '₹2219 ',
//     originalPrice: '₹999',
//     discount: '78% off',
//     color: 'Black',
//     imageSrc:
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
//   },
// ]

export const Orders = () => {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(fetchUserOrder())
  }, [dispatch])

  



  return (
    <div className="mx-auto my-4 max-w-4xl md:my-10">
      <div className="overflow-hidden rounded-xl border bg-white border-gray-100 shadow" style={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {products?.map((product) => (
                  <li
                    key={product.product._id}
                    className="flex items-stretch justify-between space-x-5 py-7"
                  >
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                          src={`http://localhost:3000/upload/${product.product.image}`}
                          alt={product.product.title}
                        />
                      </div>

                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{product.product.title}</p>
                          <p className="mt-1.5 text-sm font-medium text-gray-600">
            
                          </p>
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">{product.product.price}</p>
                      
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Orders