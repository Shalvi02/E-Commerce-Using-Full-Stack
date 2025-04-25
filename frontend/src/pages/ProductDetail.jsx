import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5002/api/products/${id}`);
        const productData = response.data;
        
        if (!productData) {
          throw new Error('Product not found');
        }

        setProduct(productData);
        
      
        if (productData.variations && productData.variations.length > 0) {
          setSelectedVariation(productData.variations[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.response?.data?.message || error.message || 'Error loading product details');
        toast.error('Error loading product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      toast.error('Product not available');
      return;
    }

    if (!selectedVariation) {
      toast.error('Please select a variation');
      return;
    }

    const cartItem = {
      productId: product.id || product._id, // Handle both id formats
      variationId: selectedVariation.id || selectedVariation._id, // Handle both id formats
      quantity,
      name: product.name,
      price: selectedVariation.price,
      image: product.images?.[0] || '',
      size: selectedVariation.size,
      color: selectedVariation.color,
    };

    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === cartItem.productId && item.variationId === cartItem.variationId
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.images?.[0] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">
                ₹{selectedVariation?.price.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}
                {selectedVariation?.discount > 0 && (
                  <span className="ml-2 text-sm text-red-600">
                    {selectedVariation.discount}% off
                  </span>
                )}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">{product.description}</div>
            </div>

            {product.variations && product.variations.length > 0 && (
              <div className="mt-6">
                <div className="mt-10">
                  {/* Size selector */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.variations.map((variation) => (
                        <button
                          key={variation.id || variation._id}
                          onClick={() => setSelectedVariation(variation)}
                          className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none ${
                            selectedVariation?.id === variation.id || selectedVariation?._id === variation._id
                              ? 'bg-indigo-50 border-indigo-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {variation.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color selector */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm text-gray-900 font-medium">Color</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.variations.map((variation) => (
                        <button
                          key={variation.id || variation._id}
                          onClick={() => setSelectedVariation(variation)}
                          className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none ${
                            selectedVariation?.id === variation.id || selectedVariation?._id === variation._id
                              ? 'bg-indigo-50 border-indigo-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {variation.color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">Quantity</h3>
              </div>

              <div className="mt-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 