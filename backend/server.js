import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// Root route
app.get('/', (req, res) => {
  res.send('API WORKING')
});

// Start server
app.listen(port, () => console.log("Server Started on port", port));
