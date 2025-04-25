import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setCartCount(getCartCount());
    fetchCategories();
  }, [getCartCount]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCategoryActive = (categoryId) => {
    const path = location.pathname;
    return path.includes(`/categories/${categoryId}`);
  };

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-white to-indigo-50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link 
                    to="/" 
                    className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-500 transition-all duration-300 drop-shadow-sm"
                  >
                    Shalvi Shop
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
                  <Link
                    to="/"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                      location.pathname === '/' 
                        ? 'border-b-2 border-indigo-500 text-gray-900' 
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Home
                  </Link>

                  <Menu as="div" className="relative">
                    <Menu.Button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                      Categories
                      <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {categories.map((category) => (
                          <Menu.Item key={category._id}>
                            {({ active }) => (
                              <Link
                                to={`/categories/${category._id}`}
                                className={classNames(
                                  active || isCategoryActive(category._id) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700',
                                  'block px-4 py-2 text-sm transition-colors duration-150'
                                )}
                              >
                                {category.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Link
                    to="/products"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                      location.pathname === '/products' 
                        ? 'border-b-2 border-indigo-500 text-gray-900' 
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    All Products
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Search products..."
                  />
                </div>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative rounded-full p-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                >
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-indigo-600 text-white rounded-full">
                      {cartCount}
                    </span>
                  )}
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </Link>

                {/* User Menu */}
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className="flex rounded-full p-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        {user ? (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                          </div>
                        ) : (
                          <UserIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {user ? (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/profile"
                                    className={classNames(
                                      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700',
                                      'block px-4 py-2 text-sm transition-colors duration-150'
                                    )}
                                  >
                                    Your Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={logout}
                                    className={classNames(
                                      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700',
                                      'block w-full text-left px-4 py-2 text-sm transition-colors duration-150'
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </>
                          ) : (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/login"
                                    className={classNames(
                                      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700',
                                      'block px-4 py-2 text-sm transition-colors duration-150'
                                    )}
                                  >
                                    Sign in
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/register"
                                    className={classNames(
                                      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700',
                                      'block px-4 py-2 text-sm transition-colors duration-150'
                                    )}
                                  >
                                    Register
                                  </Link>
                                )}
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === '/' 
                    ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700' 
                    : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <div className="pl-3 pr-4 py-2 text-base font-medium text-gray-500">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/categories/${category._id}`}
                  className={`block pl-6 pr-4 py-2 text-base font-medium ${
                    isCategoryActive(category._id)
                      ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700'
                      : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/products"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === '/products' 
                    ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700' 
                    : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                All Products
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 