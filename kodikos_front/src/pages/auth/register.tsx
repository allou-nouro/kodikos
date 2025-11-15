import React, { useState } from 'react';
import styles from '../Register.module.css';
import axios from'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
const apiUrl = import.meta.env.VITE_API_URL;

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };


  const handelRegister=()=>{
    setIsLoading(true)
    axios.post(`${apiUrl}/users/register`,formData)
    .then((res)=>{
     

    })
    .finally(()=>{
      setIsLoading(false)
    })
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };



  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${isLoading ? styles.loading : ''}`}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Join us today! Fill in your details below.</p>
        
        <form onSubmit={handelRegister} className={styles.form}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.name && <div className={styles.errorText}>{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="Enter your email address"
              disabled={isLoading}
            />
            {errors.email && <div className={styles.errorText}>{errors.email}</div>}
          </div>

          {/* Phone Field */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${errors.phone ? styles.error : ''}`}
              placeholder="Enter your phone number"
              disabled={isLoading}
            />
            {errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
          </div>

          {/* Description Field */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
              placeholder="Tell us about yourself..."
              rows="4"
              disabled={isLoading}
            />
            {errors.description && <div className={styles.errorText}>{errors.description}</div>}
          </div>

          {/* Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
              placeholder="Create a password"
              disabled={isLoading}
            />
            {errors.password && <div className={styles.errorText}>{errors.password}</div>}
          </div>

          {/* Confirm Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <div className={styles.errorText}>{errors.confirmPassword}</div>}
          </div>

          {/* Terms and Conditions */}
          <div className={styles.terms}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={styles.checkbox}
                disabled={isLoading}
              />
              <span className={styles.checkmark}></span>
              I agree to the <a href="#terms" className={styles.termsLink}>Terms and Conditions</a> *
            </label>
            {errors.agreeToTerms && <div className={styles.errorText}>{errors.agreeToTerms}</div>}
          </div>

          <button 
          onClick={handelRegister}
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.links}>
          <p>
            Already have an account? <a href="/login" className={styles.link}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;