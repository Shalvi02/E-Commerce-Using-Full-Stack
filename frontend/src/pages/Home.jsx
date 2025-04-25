import React from 'react';
import { Link } from 'react-router-dom';
import ProductSlider from '../components/ProductSlider';

const collections = [
  {
    id: 1,
    name: 'Living Room Collection',
    description: 'Modern and comfortable living room furniture',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'furniture'
  },
  {
    id: 2,
    name: 'Kitchen Essentials',
    description: 'Everything you need for a modern kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'kitchen'
  },
  {
    id: 3,
    name: 'Bedroom Comfort',
    description: 'Create your perfect sleep sanctuary',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'bedroom'
  },
  {
    id: 4,
    name: 'Home Decor',
    description: 'Beautiful accessories for every room',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'decor'
  }
];

const bestSellers = [
  {
    id: 1,
    name: 'Luxury Velvet Curtains',
    description: 'Premium velvet curtains with elegant design',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Modern Wall Clock',
    description: 'Sleek and contemporary wall clock',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isBestSeller: true
  },
  {
    id: 3,
    name: 'Woven Storage Basket',
    description: 'Handcrafted storage solution',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isBestSeller: true
  }
];

const outOfStock = [
  {
    id: 4,
    name: 'Designer Wall Art',
    description: 'Exclusive wall art collection',
    price: 19999,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isOutOfStock: true
  },
  {
    id: 5,
    name: 'Smart Home Hub',
    description: 'Next-gen smart home control',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isOutOfStock: true
  },
  {
    id: 6,
    name: 'Premium Storage System',
    description: 'Modular storage solution',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isOutOfStock: true
  }
];

const featuredCategories = [
  {
    name: 'Curtains & Drapes',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    count: '35+ Products'
  },
  {
    name: 'Wall Clocks',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    count: '20+ Products'
  },
  {
    name: 'Storage Solutions',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    count: '40+ Products'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to Shalvi Shop
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Discover our curated collection of premium home furnishings and decor. Create the perfect space that reflects your style.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Shop Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[400px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                  <p className="mt-1 text-sm text-gray-200">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers  */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSlider title="Best Sellers" products={bestSellers} />
        </div>
      </div>

      {/* Out of Stock  */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSlider title="Coming Soon" products={outOfStock} autoPlay={false} />
        </div>
      </div>

      {/*  Categories */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((category, index) => (
              <Link
                key={index}
                to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-[400px]"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-200">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 