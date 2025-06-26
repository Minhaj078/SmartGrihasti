import cookieParser from 'cookie-parser';
import express from 'express';
// import { connect, get } from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/ProductRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRouter.js';
import { stripeWebhooks } from './controllers/orderController.js';
import contactRoutes from './routes/contactRoutes.js';

// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()

// //Allowed multiple origins
// const allowedOrigins = ['http://localhost:5173']

// //Middleware  consfiguration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins,credential:true}));



// app.get('/', (req, res)=>res.send("API is Working"));
// app.use('/api/user',userRouter)
// app.use('/api/seller',sellerRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/address',addressRouter)
// app.use('/api/order',orderRouter)

// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`)
// })

// server.js

// ... (other imports)

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

const allowedOrigins = ['http://localhost:5173'];
app.post('/stripe',express.raw({type: 'application/json'}),stripeWebhooks)

// Middleware configuration
app.use(express.json());
app.use(cookieParser());

// Explicitly handle OPTIONS requests for CORS preflight
app.options('*', cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add all methods your API uses
    allowedHeaders: ['Content-Type', 'Authorization'] // Add all headers your frontend might send
}));

// Now, apply CORS to all subsequent requests (GET, POST, etc.)
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use('/api', contactRoutes);

app.get('/', (req, res)=>res.send("API is Working"));
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})