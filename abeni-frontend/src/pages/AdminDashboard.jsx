import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';
import AddUserForm from '../components/AddUserForm';

import ProductCard from '../components/ProductCard';
import SystemSettings from '../components/SystemSettings';
import { useProducts } from '../hooks/useProducts';
import apiClient from '../api/client';
import '../App.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Products management
  const { data: products = [], isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  
  // Add debugging for products data changes
  useEffect(() => {
    console.log('AdminDashboard - products data updated:', products);
  }, [products]);
  
  // Edit product state
  const [editingProduct, setEditingProduct] = useState(null);

  // Check if user has admin access
  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch users if owner
  useEffect(() => {
    if (user?.role === 'owner' && activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await apiClient.delete(`/products/${productId}`);
      // Refresh the products list
      refetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Handle product editing
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab('edit-product');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          // Refresh users list
          fetchUsers();
        } else {
          setError('Failed to delete user');
        }
      } catch (error) {
        setError('Error deleting user');
      }
    }
  };

  // Handle promoting user to admin (Owner only)
  const handlePromoteToAdmin = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to promote ${userName} to Admin? This will give them full product management access.`)) {
      try {
        const response = await fetch(`/api/users/${userId}/promote`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role: 'admin' })
        });
        
        if (response.ok) {
          // Refresh users list
          fetchUsers();
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to promote user');
        }
      } catch (error) {
        setError('Error promoting user');
      }
    }
  };

  // Handle demoting admin to user (Owner only)
  const handleDemoteToUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to demote ${userName} from Admin to User? This will remove their admin privileges.`)) {
      try {
        const response = await fetch(`/api/users/${userId}/demote`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role: 'user' })
        });
        
        if (response.ok) {
          // Refresh users list
          fetchUsers();
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to demote user');
        }
      } catch (error) {
        setError('Error demoting user');
      }
    }
  };

  // Search users by email
  const handleSearchUsers = async () => {
    if (!searchEmail.trim()) return;
    
    setIsSearching(true);
    setError('');
    
    try {
      console.log('🔍 Searching for email:', searchEmail.trim());
      const response = await fetch(`/api/users/search?email=${encodeURIComponent(searchEmail.trim())}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('🔍 Search response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Search results:', data);
        setSearchResults(data.data || []);
      } else {
        const errorData = await response.json();
        console.log('🔍 Search error:', errorData);
        setError(errorData.message || 'Failed to search users');
        setSearchResults([]);
      }
    } catch (error) {
      console.log('🔍 Search exception:', error);
      setError('Error searching users');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Clear search and show all users
  const handleClearSearch = () => {
    setSearchEmail('');
    setSearchResults([]);
    setIsSearching(false);
    fetchUsers(); // Refresh the full user list
  };

  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    return null;
  }

  return (
    <div className="admin-dashboard">
        <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {user.firstName} {user.lastName}</span>
            <span className="user-role">({user.role})</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-container">
        {/* Sidebar Navigation */}
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            
            {(user.role === 'admin' || user.role === 'owner') && (
              <button
                className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                🛍️ Manage Products
              </button>
            )}
            
            {(user.role === 'admin' || user.role === 'owner') && (
              <button
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                📦 Manage Orders
              </button>
            )}
            
            {user.role === 'owner' && (
              <button
                className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                👥 Manage Users
              </button>
            )}
            
            {user.role === 'owner' && (
              <button
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ System Settings
              </button>
            )}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="admin-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="admin-tab-content">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Products</h3>
                  <p className="stat-number">24</p>
                  <p className="stat-label">Active fragrances</p>
                </div>
                <div className="stat-card">
                  <h3>Total Orders</h3>
                  <p className="stat-number">156</p>
                  <p className="stat-label">This month</p>
                </div>
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-number">89</p>
                  <p className="stat-label">Registered customers</p>
                </div>
                <div className="stat-card">
                  <h3>Revenue</h3>
                  <p className="stat-number">$12,450</p>
                  <p className="stat-label">This month</p>
                </div>
        </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                                     {(user.role === 'admin' || user.role === 'owner') && (
                     <button 
                       className="action-btn primary"
                       onClick={() => setActiveTab('products')}
                     >
                       ➕ Add New Product
                     </button>
                   )}
                   {user.role === 'owner' && (
          <button 
                       className="action-btn secondary"
                       onClick={() => setActiveTab('users')}
                     >
                       👤 Create Admin User
                     </button>
                   )}
                  <button className="action-btn secondary">
                    📊 View Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="admin-tab-content">
              <div className="tab-header">
                <h2>Manage Products</h2>
                <button className="add-product-btn" onClick={() => setActiveTab('add-product')}>
                  ➕ Add New Product
                </button>
              </div>

              <div className="products-management">
                {productsLoading ? (
                  <div className="loading-spinner">Loading products...</div>
                ) : productsError ? (
                  <div className="error-message">Error loading products: {productsError.message}</div>
                ) : products.length === 0 ? (
                  <div className="no-products">
                    <p>No products found. Add your first product to get started!</p>
                    <button className="btn btn-primary" onClick={() => setActiveTab('add-product')}>
                      ➕ Add First Product
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="products-summary">
                      <p>Total Products: {products.length}</p>
                    </div>
                    <div className="products-grid admin-products-grid">
                      {products.map(product => (
                        <ProductCard 
                          key={product._id} 
                          product={product} 
                          showAdminControls={true}
                          onDelete={handleDeleteProduct}
                          onEdit={handleEditProduct}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="admin-tab-content">
              <h2>Manage Orders</h2>
              <div className="orders-management">
                <p>Order management interface will be implemented here.</p>
                <p>Admins and owners can view, process, and manage customer orders.</p>
              </div>
            </div>
          )}

          {/* Users Tab - Owner Only */}
          {activeTab === 'users' && user.role === 'owner' && (
            <div className="admin-tab-content">
              <div className="tab-header">
                <h2>Manage Users</h2>
                <button className="add-user-btn" onClick={() => setActiveTab('add-user')}>
                  👤 Add New User
                </button>
              </div>
              
              <div className="user-management-info">
                <p><strong>📋 User Management Process:</strong></p>
                <ul>
                  <li>Users must first register as normal users through the regular signup process</li>
                  <li>Only the Owner can promote regular users to Admin status</li>
                  <li>Admins can be demoted back to regular users if needed</li>
                  <li>Owner accounts cannot be modified or deleted</li>
                </ul>
              </div>
              
              {/* User Search */}
              <div className="user-search-container">
                <div className="search-input-group">
                  <input
                    type="email"
                    placeholder="Search users by email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="search-input"
                  />
                  <div className="button-group">
                    <button 
                      onClick={handleSearchUsers}
                      className="search-btn"
                      disabled={!searchEmail.trim() || isSearching}
                    >
                      {isSearching ? '⏳ Searching...' : '🔍 Search'}
                    </button>
                    <button 
                      onClick={handleClearSearch}
                      className="clear-search-btn"
                      disabled={!searchEmail.trim()}
                    >
                      ✕ Clear
                    </button>
                  </div>
                </div>
                {searchResults.length > 0 && (
                  <div className="search-results-info">
                    <p>Found {searchResults.length} user(s) matching "{searchEmail}"</p>
                  </div>
                )}
                {searchResults.length === 0 && searchEmail.trim() && !isSearching && (
                  <div className="search-results-info no-results">
                    <p>No users found matching "{searchEmail}"</p>
                  </div>
                )}
              </div>
              
              {loading ? (
                <div className="loading-spinner">Loading users...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Show search results if available, otherwise show all users */}
                      {(searchResults.length > 0 ? searchResults : users)
                        .sort((a, b) => {
                          // Sort by role: owner first, then admin, then user
                          const roleOrder = { owner: 1, admin: 2, user: 3 };
                          return roleOrder[a.role] - roleOrder[b.role];
                        })
                        .map(userItem => (
                           <tr key={userItem._id}>
                             <td>{userItem.firstName} {userItem.lastName}</td>
                             <td>{userItem.email}</td>
                             <td>
                               <span className={`role-badge ${userItem.role}`}>
                                 {userItem.role}
                               </span>
                             </td>
                             <td>
                               <span className={`status-badge ${userItem.isActive ? 'active' : 'inactive'}`}>
                                 {userItem.isActive ? 'Active' : 'Inactive'}
                               </span>
                    </td>
                             <td>{new Date(userItem.createdAt).toLocaleDateString()}</td>
                                        <td>
                      <div className="user-actions">
                        {/* Promote/Demote buttons - Owner only */}
                        {user.role === 'owner' && (
                          <>
                            {userItem.role === 'user' && (
                              <button 
                                className="action-btn small success"
                                onClick={() => handlePromoteToAdmin(userItem._id, userItem.firstName)}
                                title="Promote to Admin"
                              >
                                ⬆️ Promote
                              </button>
                            )}
                            
                            {userItem.role === 'admin' && (
                              <button 
                                className="action-btn small warning"
                                onClick={() => handleDemoteToUser(userItem._id, userItem.firstName)}
                                title="Demote to User"
                              >
                                ⬇️ Demote
                              </button>
                            )}
                          </>
                        )}
                        
                        {/* Delete button - Owner only, can't delete other owners */}
                        {user.role === 'owner' && userItem.role !== 'owner' && (
                          <button 
                            className="action-btn small danger"
                            onClick={() => handleDeleteUser(userItem._id, userItem.firstName)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Show "No users available" only when there are no users at all */}
            {users.length === 0 && searchResults.length === 0 && !loading && (
              <div className="no-users-message">
                <p>No users available</p>
              </div>
            )}
          </div>
              )}
        </div>
          )}

          {/* Add Product Tab */}
          {activeTab === 'add-product' && (
            <div className="admin-tab-content">
              <div className="tab-header">
                <h2>Add New Product</h2>
                <button className="btn btn-secondary" onClick={() => setActiveTab('products')}>
                  ← Back to Products
                </button>
              </div>

              <AddProductForm onSuccess={() => setActiveTab('products')} refetch={refetchProducts} />
            </div>
          )}

          {/* Edit Product Tab */}
          {activeTab === 'edit-product' && editingProduct && (
            <div className="admin-tab-content">
              <div className="tab-header">
                <h2>Edit Product: {editingProduct.name}</h2>
                <button className="btn btn-secondary" onClick={() => {
                  setActiveTab('products');
                  setEditingProduct(null);
                }}>
                  ← Back to Products
                </button>
              </div>

              <EditProductForm 
                product={editingProduct} 
                onSuccess={() => {
                  setActiveTab('products');
                  setEditingProduct(null);
                  refetchProducts();
                }}
                onCancel={() => {
                  setActiveTab('products');
                  setEditingProduct(null);
                }}
              />
            </div>
          )}

          {/* Add User Tab - Owner Only */}
          {activeTab === 'add-user' && user.role === 'owner' && (
            <div className="admin-tab-content">
              <div className="tab-header">
                <h2>Add New User</h2>
                <button className="btn btn-secondary" onClick={() => setActiveTab('users')}>
                  ← Back to Users
                </button>
          </div>

              <AddUserForm onSuccess={() => setActiveTab('users')} />
          </div>
          )}



          {/* Settings Tab - Owner Only */}
          {activeTab === 'settings' && user.role === 'owner' && (
            <div className="admin-tab-content">
              <SystemSettings />
            </div>
          )}
            </div>
      </div>
    </div>
  );
}
