import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import '../App.css';

const EditProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'perfume',
    scentNotes: '',
    stock: '',
    sustainabilityScore: '',
    tags: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize form with product data
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'perfume',
        scentNotes: Array.isArray(product.scentNotes) ? product.scentNotes.join(', ') : product.scentNotes || '',
        stock: product.stock || '',
        sustainabilityScore: product.sustainabilityScore || '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || ''
      });
      
      // Set current image
      if (product.images && product.images.length > 0) {
        setCurrentImage(product.images[0]);
        setImagePreview(product.images[0]);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, GIF)');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      setError(''); // Clear any previous errors
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreview(currentImage);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(currentImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert tags string to array
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
      
      // Create FormData for image upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('scentNotes', formData.scentNotes);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('sustainabilityScore', formData.sustainabilityScore);
      formDataToSend.append('tags', JSON.stringify(tagsArray));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const response = await apiClient.put(`/products/${product._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Product updated successfully!');
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-form">
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., Rose Garden Eau de Parfum"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="perfume">Perfume</option>
              <option value="cologne">Cologne</option>
              <option value="body-spray">Body Spray</option>
              <option value="oil">Perfume Oil</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (USD) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="form-input"
              placeholder="29.99"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Quantity *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="form-input"
              placeholder="100"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="form-input"
            placeholder="Describe the fragrance, its notes, and what makes it special..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <div className="image-upload-container" onClick={() => document.getElementById('image').click()}>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
            <div className="image-upload-info">
              <p>📁 Click to select a new image from your computer</p>
              <p>Supported formats: JPG, PNG, GIF (Max 5MB)</p>
            </div>
          </div>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              {selectedImage && (
                <button 
                  type="button" 
                  onClick={removeImage}
                  className="remove-image-btn"
                >
                  ❌ Remove New Image
                </button>
              )}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="scentNotes">Scent Notes</label>
          <input
            type="text"
            id="scentNotes"
            name="scentNotes"
            value={formData.scentNotes}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Rose, Jasmine, Vanilla, Musk"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sustainabilityScore">Sustainability Score (1-10)</label>
            <input
              type="number"
              id="sustainabilityScore"
              name="sustainabilityScore"
              value={formData.sustainabilityScore}
              onChange={handleChange}
              min="1"
              max="10"
              className="form-input"
              placeholder="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="romantic, floral, long-lasting, luxury"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
