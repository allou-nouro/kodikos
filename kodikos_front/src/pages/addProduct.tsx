import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '@/context/userContext';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: [], // تغيير إلى array
    type: '',
    size: [{ name: '', quantity: '' }], // تغيير إلى array of objects
    colors: [''], // تغيير إلى array
    quality: '',
    image: '' // سيتم إرسال الصور بشكل مختلف
  });
  
  const { token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const categories = [
    'Electronics',
    'Clothing', 
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys',
    'Other'
  ];

  const qualities = ['New', 'Used', 'Refurbished'];
  const types = ['Physical', 'Digital', 'Service'];

  // دالة لإضافة حجم جديد
  const addSize = () => {
    setFormData({
      ...formData,
      size: [...formData.size, { name: '', quantity: '' }]
    });
  };

  // دالة لإزالة حجم
  const removeSize = (index) => {
    const newSizes = formData.size.filter((_, i) => i !== index);
    setFormData({ ...formData, size: newSizes });
  };

  // دالة لتحديث حجم
  const updateSize = (index, field, value) => {
    const newSizes = formData.size.map((size, i) => 
      i === index ? { ...size, [field]: value } : size
    );
    setFormData({ ...formData, size: newSizes });
  };

  // دالة لإضافة لون جديد
  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, '']
    });
  };

  // دالة لإزالة لون
  const removeColor = (index) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
  };

  // دالة لتحديث لون
  const updateColor = (index, value) => {
    const newColors = formData.colors.map((color, i) => 
      i === index ? value : color
    );
    setFormData({ ...formData, colors: newColors });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // معالجة الـ category كـ array
      const checked = e.target.checked;
      if (name === 'category') {
        setFormData({
          ...formData,
          category: checked 
            ? [...formData.category, value]
            : formData.category.filter(cat => cat !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) return 'Valid price is required';
    if (formData.category.length === 0) return 'Please select at least one category';
    if (!formData.type) return 'Please select product type';
    if (!formData.quality) return 'Please select product quality';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    // تحضير البيانات حسب ما يتوقعه الـ API
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      type: formData.type,
      size: formData.size
        .filter(size => size.name.trim() && size.quantity) // إزالة الأحجام الفارغة
        .map(size => ({
          name: size.name.toLowerCase(),
          quantity: parseInt(size.quantity)
        })),
      colors: formData.colors.filter(color => color.trim()), // إزالة الألوان الفارغة
      quality: formData.quality
    };

    console.log('Sending data:', productData);

    axios.post(`${apiUrl}/api/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      setSuccess('Product created successfully!');
      console.log('Product created:', res.data);
      
      // إعادة تعيين الفورم
      setFormData({
        name: '',
        description: '',
        price: '',
        category: [],
        type: '',
        size: [{ name: '', quantity: '' }],
        colors: [''],
        quality: '',
        image: ''
      });
    })
    .catch((err) => {
      console.error('Error creating product:', err);
      
      if (err.response?.status === 404) {
        setError('API endpoint not found. Please check the server URL.');
      } else if (err.response?.status === 401) {
        setError('Unauthorized - Please login again');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create product. Please try again.');
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Add New Product
            </h2>
            <p className="text-gray-600">
              Fill in the details below to add a new product to your store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Messages */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <span className="text-green-800 font-medium">{success}</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            )}

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name"
                disabled={isLoading}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical min-h-[100px]"
                placeholder="Describe the product..."
                rows="4"
                disabled={isLoading}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={isLoading}
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
                required
              >
                <option value="">Select type</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality *
              </label>
              <select
                name="quality"
                value={formData.quality}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
                required
              >
                <option value="">Select quality</option>
                {qualities.map(quality => (
                  <option key={quality} value={quality}>{quality}</option>
                ))}
              </select>
            </div>

            {/* Categories - Multiple Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value={category}
                      checked={formData.category.includes(category)}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes
              </label>
              {formData.size.map((size, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Size"
                    value={size.name}
                    onChange={(e) => updateSize(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={size.quantity}
                    onChange={(e) => updateSize(index, 'quantity', e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                  />
                  {formData.size.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSize}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Size
              </button>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors
              </label>
              {formData.colors.map((color, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {formData.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addColor}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Color
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Product...</span>
                </>
              ) : (
                <span>Create Product</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;