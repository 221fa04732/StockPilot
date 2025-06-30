import express from 'express'
const supplierRouter = express.Router();

import addSupplier from '../routes/addSupplier';
import deleteSupplier from '../routes/deleteSupplier';
import updateSupplier from '../routes/updateSupplier';
import getSupplier from '../routes/getSupplier';

supplierRouter.post('/add', addSupplier)
supplierRouter.post('/delete', deleteSupplier)
supplierRouter.post('/update', updateSupplier)
supplierRouter.get('/', getSupplier)

export default supplierRouter;