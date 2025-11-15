import TextField from "@mui/material/TextField";
export default function InputText({ label,placeholder,value,setValue }) {
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        margin: "10px auto",
      }}
    >
    <p>{label}</p>
      <TextField
 value={value} 
        onChange={(e)=>{setValue(e.target.value)}}
       placeholder={placeholder}
        variant="outlined"
        fullWidth
        size="small" 
        sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
    },
  }}
      />
    </div>
  );
}
