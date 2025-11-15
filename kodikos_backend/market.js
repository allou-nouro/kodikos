const express = require("express");
const connect = require("./config/dbconnect")
const errorHandler = require("./middleware/errorhandler"); 
const path = require('path');
const cors = require("cors");
require('dotenv').config();

const app = express();
connect();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())
app.use("/api/product",require("./routes/ProductRoutes"));
app.use("/api/category",require("./routes/categoryRoutes"))
app.use("/api/users",require("./routes/userRoute"))
app.use("/api/size",require("./routes/sizeRoutes"))
app.use('/api/orders',require('./routes/orderRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server runing o port ${port}`)
});