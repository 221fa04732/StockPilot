import express from 'express'
const productRouter = express.Router();

import addProduct from '../routes/addProduct';
import deleteProduct from '../routes/deleteProduct';

productRouter.post('/add', addProduct)
productRouter.post('/delete', deleteProduct)

export default productRouter;