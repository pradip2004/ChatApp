import express from "express";
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute)



app.listen(process.env.PORT, ()=>{
      console.log(`Server is running on port ${process.env.PORT}...`);
      connectDB();
})