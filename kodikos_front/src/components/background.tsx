import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BackGround(){
    const location = useLocation();
    const [style, setStyle] = useState({
        login: false,
        title: 'New here!',
        description: 'Join our network and <br/> start growing today!'
    });

    useEffect(() => {
        if (location.pathname === '/login'){
            setStyle({
                login: true,
                title: 'Welcome back!',
                description: 'Log in to access your <br></br> dashboard and grow your<br></br> business effortlessly'
            });
        } else {
            setStyle({
                login: false,
                title: 'New here!',
                description: 'Join our network and <br/> start growing today!'
            });
        }
    }, [location.pathname]); // أضف dependency هنا لمنع loop لا نهائي

    return (
       <div
  style={{
    width: '47vw',
    height: '95vh',
    background: 'linear-gradient(to right, #4FA1F7, #006ACC)',
    backgroundImage: 'url("./images/mask image.png")',
    backgroundSize: 'cover',          // يغطي كامل الحاوية
    backgroundPosition: 'center',     // مركز الصورة
    backgroundRepeat: 'no-repeat',    // منع التكرار
    position: 'absolute',
    zIndex: 10,
    left: style.login ? '50vw' : '2vw',
    transition: '1s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius:'16px'
  }}
>
            <div style={{
                width: '80%',
                height: '77%', // عدلت الارتفاع ليكون متناسباً
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px',
                border: '2px solid rgba(255, 255, 255, 0.45)',
                WebkitBackdropFilter: 'blur(2px)' ,

            }}>
                <div
            style={{
                 display:'flex',
                justifyContent:'start',
                alignItems:'center',
                gap:'15px',
                marginBottom:'20px',
                marginTop:'20px'
                
            }}
            >
                <img src="./images/Capture_d_écran_2025-11-12_131612-removebg-preview.png" alt=''
                style={{
                    width:'70px'
                }}
                 />
                <h1 style={{fontWeight:'500',fontSize:'30px'}}>AZ Affiliate</h1>
            </div >
                <h1 style={{
                    fontSize: '40px',
                    margin: '0 0 20px 0',
                    fontWeight:'500'
                }}>
                    {style.title} {/* استخدم المتغير الديناميكي */}
                </h1>
                <h2 style={{
                    fontSize: '25px',
                    margin: 0,
                    fontWeight:"400",
                    lineHeight: '1' ,
                    marginTop:'15px'
                }} dangerouslySetInnerHTML={{
                    __html: style.description // استخدم المتغير الديناميكي
                }} />
            </div>
        </div>
    );
}