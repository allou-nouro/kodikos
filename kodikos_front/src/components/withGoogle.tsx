export default function WithGoogle({text}){
    return (
        <div style={{
             display:'flex',
            justifyContent:"center",
            alignItems:'center',
            width:"70%",
            gap:'10px',
            border:'2px solid #0000002c',
            padding:"10px",
            borderRadius:'15px',
            cursor:'pointer'
        }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="" style={{
                width:'30px',
                
            }} />
            <p>{text}</p>
        </div>
    )
}