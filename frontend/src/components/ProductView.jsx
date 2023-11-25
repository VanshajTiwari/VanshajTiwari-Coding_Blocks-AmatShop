import React from 'react'
import { Star, ChevronDown } from 'lucide-react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'Black',
    brand: 'Zara',
    category: 'New Arrival',
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi magnam dolore fugiat error, beatae consequatur quod dolorem quasi corporis impedit mollitia, velit fuga consequuntur quas cupiditate pariatur vero in. Quis modi aliquam placeat, quibusdam reiciendis consequuntur nesciunt, temporibus id asperiores dicta repellat maiores minima facere necessitatibus eius harum iste earum."
  },
];

const ProductView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const product = location?.state?.prod

  return (
    <div>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-full px-5 py-24">
              <div className="mx-auto flex flex-wrap items-center lg:w-full bg-white p-[2%]" >
                <img
                  alt={product.title}
                  className="h-64 w-full rounded object-contain lg:h-96 lg:w-1/2"
                  src={`http://localhost:3000/upload/${product.image}`}
                />
                <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                  <h2 className="text-sm font-semibold tracking-widest text-gray-500">{product.brand}</h2>
                  <h1 className="my-4 text-3xl font-semibold text-black">{product.title}</h1>
                  <div className="my-4 flex items-center">
                    <span className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-500" />
                      ))}
                      <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="title-font text-xl font-bold text-gray-900">₹{product.price}</span>
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={ () => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
        </div>
      </section >
    </div >
  )
}

export default ProductView
