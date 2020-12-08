import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import connectDB from './config/db.js';

// import products from './data/products.js';
import productRoutes from './routes/productRouts.js';
import userRoutes from './routes/userRouts.js';

import {notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());


dotenv.config();

connectDB();
/**
 * Routs
 */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    });
}

app.use('/api/products', productRoutes )
app.use('/api/users', userRoutes )

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow.bold));