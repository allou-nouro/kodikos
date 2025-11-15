import React, { useState } from 'react';
import styles from '../Login.module.css';

const Dgin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('بيانات تسجيل الدخول:', formData);
    // هنا يمكنك إضافة منطق تسجيل الدخول
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>تسجيل الدخول</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <div className={styles.rememberMe}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              تذكرني
            </label>
          </div>

          <button type="submit" className={styles.button}>
            تسجيل الدخول
          </button>
        </form>

        <div className={styles.links}>
          <a href="#forgot" className={styles.link}>نسيت كلمة المرور؟</a>
          <span className={styles.separator}>|</span>
          <a href="#register" className={styles.link}>إنشاء حساب جديد</a>
        </div>
      </div>
    </div>
  );
};

export default Dgin;