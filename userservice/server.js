require('dotenv').config();
const express=require('express');
const app=express();

const connectDB=require('./config/db.js')
const userRoutes=require('./routes/userRoutes.js')



app.use(express.json());
connectDB()
app.use("/api/user", userRoutes);
const PORT=3000;

app.listen(PORT,()=>{
    console.log(`User Service running on port ${PORT}`)
})
