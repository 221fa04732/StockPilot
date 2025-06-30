import express from 'express'
const supplierRouter = express.Router();

import addSupplier from '../routes/addSupplier';

supplierRouter.post('/add', addSupplier)

export default supplierRouter;