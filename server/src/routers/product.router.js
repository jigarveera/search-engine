import { Router } from 'express';
import { getAllProductsController, createProductController, getProductByIdController, deleteAllProductsController, createProductsController, deleteProductByIdController } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.get('/products', getAllProductsController);
productRouter.post('/product', createProductController);
productRouter.post('/products', createProductsController);
productRouter.get('/product/:id', getProductByIdController);
productRouter.delete('/products', deleteAllProductsController);
productRouter.delete('/product/:id', deleteProductByIdController);
export default productRouter;