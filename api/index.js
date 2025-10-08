import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

import connectDB from '../backend/config/db.js';
import productRoutes from '../backend/routes/productRoutes.js';
import userRoutes from '../backend/routes/userRoutes.js';
import orderRoutes from '../backend/routes/orderRoutes.js';
import uploadRoutes from '../backend/routes/uploadRoutes.js';
import { notFound, errorHandler } from '../backend/middleware/errorMiddleware.js';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/razorpay', (req, res) =>
  res.send({ keyId: process.env.RAZORPAY_KEY_ID })
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Export for Vercel
export default app;