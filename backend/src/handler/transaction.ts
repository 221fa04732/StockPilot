import express from 'express'
const transactionRouter = express.Router();

import getTransaction from '../routes/getTransaction';

transactionRouter.get('/', getTransaction)

export default transactionRouter;