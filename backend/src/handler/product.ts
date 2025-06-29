import express from 'express'
const productRouter = express.Router();

import addProduct from '../routes/addProduct';

productRouter.post('/add', addProduct)

export default productRouter;