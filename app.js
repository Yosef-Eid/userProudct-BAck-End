// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import password from './routes/password.js';
import helmet from 'helmet';
import cors from 'cors';
// import upload from './routes/upload.js';

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to set security headers
app.use(helmet());

// Middleware to allow cross-origin requests
app.use(cors());

// Set up view engine
app.set('view engine', 'ejs');

// Connect to the database
connectDb();

// Set up routes
app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', password);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
