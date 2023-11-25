import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Filter, Minus, Plus, X } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../redux/actions";
import { Link } from "react-router-dom";

const filters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-500", label: "Under 500" },
      { value: "500-1000", label: "500 - 1000" },
      { value: "1000-2000", label: "1000 - 2000" },
      { value: "2000-5000", label: "2000 - 5000" },
      { value: "5000-10000", label: "5000 - 10000" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "New Arrival", label: "All New Arrivals" },
      { value: "Top", label: "Top" },
      { value: "Trending", label: "Trending" },
      { value: "sweatshirts", label: "Sweatshirts" },
      { value: "pants-shorts", label: "Pants & Shorts" },
    ],
  },
  {
    id: "brand",
    name: "Brands",
    options: [
      { value: "H&M", label: "H&M" },
      { value: "Zara", label: "Zara" },
      { value: "Nike", label: "Nike" },
      { value: "acer", label: "Acer" },
      { value: "lenovo", label: "Lenovo" },
      { value: "asus", label: "Asus" },
    ],
  },
];

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 35,
//     color: 'Black',
//     brand: 'Zara',
//     category: 'New Arrival'
//   },
//   {
//     id: 2,
//     name: 'Nike ',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 40,
//     color: 'Black',
//     brand: 'Nike',
//     category: 'New Arrival'
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 55,
//     color: 'Black',
//     brand: 'Basic Tee',
//     category: 'New Arrival'
//   },
//   {
//     id: 4,
//     name: 'H&M',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 85,
//     color: 'Black',
//     brand: 'H&M',
//     category: 'Trending'
//   },
//   {
//     id: 5,
//     name: 'Zara',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 65,
//     color: 'Black',
//     brand: 'Zara',
//     category: 'Top'
//   },

// ]

function Products() {
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    category: [],
    brand: [],
  });

  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.product;
  });

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("called");
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const filterByPrice =
      selectedFilters.price.length === 0 ||
      selectedFilters.price.some(
        (range) => product.price >= range[0] && product.price <= range[1]
      );

    const filterByCategory =
      selectedFilters.category.length === 0 ||
      selectedFilters.category.includes(product.category);

    const filterByBrand =
      selectedFilters.brand.length === 0 ||
      selectedFilters.brand.includes(product.brand);

    return filterByPrice && filterByCategory && filterByBrand;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilters;

      if (filterType === "price") {
        // For the price filter, value should be an array with two elements: [min, max]
        updatedFilters = {
          ...prevFilters,
          [filterType]: value,
        };
      } else {
        // For other filters, value can be a single value or an array
        updatedFilters = {
          ...prevFilters,
          [filterType]: Array.isArray(value) ? value : [value],
        };
      }
      return updatedFilters;
    });
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <Minus
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <Plus
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={() => {
                                        const currentValue = option.value;

                                        // Handle price filter separately
                                        if (section.id === "price") {
                                          const [min, max] = currentValue
                                            .split("-")
                                            .map(Number);

                                          if (
                                            selectedFilters.price.some(
                                              (range) =>
                                                range[0] === min &&
                                                range[1] === max
                                            )
                                          ) {
                                            // Deselect the current value
                                            const updatedFilters =
                                              selectedFilters.price.filter(
                                                (val) =>
                                                  val[0] !== min ||
                                                  val[1] !== max
                                              );
                                            handleFilterChange(
                                              section.id,
                                              updatedFilters
                                            );
                                          } else {
                                            // Select the current value
                                            const updatedFilters = [
                                              ...selectedFilters.price,
                                              [min, max],
                                            ];
                                            handleFilterChange(
                                              section.id,
                                              updatedFilters
                                            );
                                          }
                                        } else {
                                          // Handle other filters
                                          const updatedFilters =
                                            selectedFilters[
                                              section.id
                                            ].includes(currentValue)
                                              ? selectedFilters[
                                                  section.id
                                                ].filter(
                                                  (val) => val !== currentValue
                                                )
                                              : [
                                                  ...selectedFilters[
                                                    section.id
                                                  ],
                                                  currentValue,
                                                ];

                                          handleFilterChange(
                                            section.id,
                                            updatedFilters
                                          );
                                        }
                                      }}
                                    />

                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 m-auto">
              {products.title}
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <Filter className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <Minus className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <Plus className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={() => {
                                    const currentValue = option.value;

                                    // Handle price filter separately
                                    if (section.id === "price") {
                                      const [min, max] = currentValue
                                        .split("-")
                                        .map(Number);

                                      if (
                                        selectedFilters.price.some(
                                          (range) =>
                                            range[0] === min && range[1] === max
                                        )
                                      ) {
                                        // Deselect the current value
                                        const updatedFilters =
                                          selectedFilters.price.filter(
                                            (val) =>
                                              val[0] !== min || val[1] !== max
                                          );
                                        handleFilterChange(
                                          section.id,
                                          updatedFilters
                                        );
                                      } else {
                                        // Select the current value
                                        const updatedFilters = [
                                          ...selectedFilters.price,
                                          [min, max],
                                        ];
                                        handleFilterChange(
                                          section.id,
                                          updatedFilters
                                        );
                                      }
                                    } else {
                                      // Handle other filters
                                      const updatedFilters = selectedFilters[
                                        section.id
                                      ].includes(currentValue)
                                        ? selectedFilters[section.id].filter(
                                            (val) => val !== currentValue
                                          )
                                        : [
                                            ...selectedFilters[section.id],
                                            currentValue,
                                          ];

                                      handleFilterChange(
                                        section.id,
                                        updatedFilters
                                      );
                                    }
                                  }}
                                />

                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {filteredProducts.map((product) => (
                        <Link to="/ProductView" state={{ prod: product }}
                          key={product.id}
                          // href={product.href}
                          className="group"
                        >
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                              src={`http://localhost:3000/upload/${product.image}`}
                              // alt={product.imageAlt}
                              className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <h3 className="mt-4 text-sm text-gray-700">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            &#8377;{product.price}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
Products.defaultProps = {
  name: "Products",
};

export default Products;
