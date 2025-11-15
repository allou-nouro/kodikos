import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// إنشاء Context
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // الحالة الابتدائية من localStorage أو قيم افتراضية
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });


  const [token,setToken]=useState(()=>{
    return localStorage.getItem('token')||''
  })

  // حفظ البيانات في localStorage عند التغيير
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);


  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
