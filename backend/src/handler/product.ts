import express from 'express'
const productRouter = express.Router();

import addProduct from '../routes/addProduct';
import deleteProduct from '../routes/deleteProduct';
import updateProduct from '../routes/updateProduct';
import getProduct from '../routes/getProduct';
import buyProduct from '../routes/buyProduct';
import sellProduct from '../routes/sellProduct';

productRouter.post('/add', addProduct)
productRouter.post('/delete', deleteProduct)
productRouter.post('/update', updateProduct)
productRouter.get('/', getProduct)
productRouter.post('/buy', buyProduct)
productRouter.post('/sell', sellProduct)

export default productRouter;