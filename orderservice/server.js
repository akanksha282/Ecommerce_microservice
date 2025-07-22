require('dotenv').config();
const express=require('express')
const app=express()
const connectDB=require("./config/db.js")
const orderRoutes=require('./routes/orderRoutes.js')


app.use(express.json())
connectDB()

app.use('/api/order',orderRoutes);
const PORT=5000

app.listen(PORT,()=>{
     console.log(`Order Service running on port ${PORT}`);
})

