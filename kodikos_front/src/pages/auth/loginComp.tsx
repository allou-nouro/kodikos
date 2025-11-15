import React, { useState } from 'react';
import styles from '../Login.module.css';
import axios from 'axios';
import { AppContext } from '@/context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate()
  const {setToken,setUser}=useContext(AppContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // تأكد من أن المتغير البيئي موجود
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    // مسح الخطأ عند البدء في الكتابة
    if (error) setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault(); // مهم لمنع إعادة تحميل الصفحة
    
    // تحقق بسيط من البيانات
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    axios.post(`${apiUrl}/users/login`, formData)
      .then((res) => {
       
        
        // حفظ token إذا كان موجود في الرد
        if (res.data.token) {
          setToken(res.data.token)
        }
        setUser(res.data.owner)
        // إعادة تعيين الحقول
        setFormData({
          email: '',
          password: '',
        });
        navigate('/')
      })
      .catch((err) => {
        console.error('Login error:', err);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
        alert('Login failed: ' + (err.response?.data?.message || 'Please check your credentials'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>
        
        <form onSubmit={handleLogin} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.links}>
          <a href="#forgot" className={styles.link}>Forgot Password?</a>
          <span className={styles.separator}>|</span>
          <a href="/register" className={styles.link}>Create New Account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;