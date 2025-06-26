// import express from "express"
// import { upload } from "../config/multer.js";
// import authSeller from "../middlewares/authSeller.js";
// import { addProduct, changeStock, productById, productList } from "../controllers/productControllers.js";


// const productRouter = express.Router();

// productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
// productRouter.get('/list',productList)
// productRouter.get('/:id',productById)
// productRouter.get('/stock',authSeller,changeStock)

// export default productRouter;

// C:\Users\rockr\OneDrive\Desktop\ecommerce\server\routes\ProductRoute.js

import express from "express"
import { upload } from "../config/multer.js";
import authSeller from "../middlewares/authSeller.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
productRouter.get('/list',productList)
productRouter.get('/:id',productById) // <--- THIS LINE IS THE KEY CHANGE. REMOVED '/id' AND ADDED '/:id'
productRouter.post('/stock',authSeller,changeStock)

export default productRouter;