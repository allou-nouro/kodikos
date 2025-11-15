import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ContainerPage({ children }) {
  const location=useLocation()
  const [locationValue,setLocationValue]=useState(location.pathname)
  useEffect(()=>{
    setLocationValue(location.pathname)
  },[location.pathname])
  return (
    <div
      style={{
        position: 'relative',
        width: `calc(100vw - ${location.pathname!=='/login'&&location.pathname!=='/register'? '360px':'0'})`, // تصحيح
        height: '100vh',
        left:'100%',
        transform:'translateX(-100%)'
      }}
    >
      {children}
    </div>
  );
}
