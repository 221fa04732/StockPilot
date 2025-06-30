import express from 'express'
const supplierRouter = express.Router();

import addSupplier from '../routes/addSupplier';
import deleteSupplier from '../routes/deleteSupplier';

supplierRouter.post('/add', addSupplier)
supplierRouter.post('/delete', deleteSupplier)

export default supplierRouter;