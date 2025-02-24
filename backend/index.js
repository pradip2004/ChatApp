import express from "express";
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from "./config/socket.js";

dotenv.config();
app.use(express.json({ limit: "10mb" })); // Increase limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization']
}
));
app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute)



server.listen(process.env.PORT, ()=>{
      console.log(`Server is running on port ${process.env.PORT}...`);
      connectDB();
})