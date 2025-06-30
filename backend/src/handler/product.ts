import express from 'express'
const productRouter = express.Router();

import addProduct from '../routes/addProduct';
import deleteProduct from '../routes/deleteProduct';
import updateProduct from '../routes/updateProduct';

productRouter.post('/add', addProduct)
productRouter.post('/delete', deleteProduct)
productRouter.post('/update', updateProduct)

export default productRouter;