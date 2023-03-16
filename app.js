const express = require('express');
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const product_routes = require("./routes/product")
app.get("/",(req,res) => {
    res.send("Hi, I am live");
});

// middleware or to set router
app.use("/api/product",product_routes)

const start = async () =>{
    try {
        await connectDB(process.env.MONGODB_URI);
       app.listen(PORT, () =>{
          console.log(`${PORT} is connected`);
       }); 
    } catch (error) {
       console.log(error); 
    }
}
start();