import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const API_URL = 'https://shalvi-shop-backend.onrender.com';

export default function Categories() {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    loadCategories();
    if (id) {
      loadSubcategories(id);
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await axios.get(`${API_URL}/api/categories`);
      console.log('Categories response:', response.data);
      if (response.data && Array.isArray(response.data)) {
        setCategoryList(response.data);
        if (id) {
          const category = response.data.find(cat => cat._id === id);
          setSelectedCategory(category);
          setActiveCategoryId(category._id);
        }
      } else {
        setErrorMessage('Invalid categories data received');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setErrorMessage('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await axios.get(`${API_URL}/api/categories/${categoryId}/subcategories`);
      console.log('Subcategories response:', response.data);
      if (response.data && Array.isArray(response.data)) {
        setSubcategoryList(response.data);
      } else {
        setErrorMessage('Invalid subcategories data received');
      }
    } catch (error) {
      console.error('Error loading subcategories:', error);
      setErrorMessage('Failed to load subcategories');
    } finally {
      setIsLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg';
    if (image.startsWith('http')) return image;
    return `${API_URL}/${image}`;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg';
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link to="/categories" className="hover:text-indigo-600">Categories</Link>
          {selectedCategory && (
            <>
              <ChevronRightIcon className="h-4 w-4" />
              <span className="text-gray-900">{selectedCategory.name}</span>
            </>
          )}
        </div>

        {!id ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryList.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}`}
                onClick={() => handleCategoryClick(category._id)}
                className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative ${
                  activeCategoryId === category._id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
                    onError={handleImageError}
                  />
                  {activeCategoryId === category._id && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white px-2 py-1 rounded-bl-lg text-sm font-medium">
                      Active
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{category.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.subcategories?.length || 0} subcategories
                    </span>
                    <span className="text-indigo-600 group-hover:text-indigo-700">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{selectedCategory.name}</h1>
              <p className="text-lg text-gray-600">{selectedCategory.description}</p>
            </div>

            {subcategoryList.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No subcategories found</h3>
                <p className="mt-2 text-sm text-gray-500">This category doesn't have any subcategories yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategoryList.map((subcategory) => (
                  <Link
                    key={subcategory._id}
                    to={`/products?category=${selectedCategory._id}&subcategory=${subcategory._id}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={getImageUrl(subcategory.image)}
                        alt={subcategory.name}
                        className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {subcategory.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{subcategory.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {subcategory.products?.length || 0} products
                        </span>
                        <span className="text-indigo-600 group-hover:text-indigo-700">View Products →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 