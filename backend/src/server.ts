import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import productRouter from './handler/product'
import supplierRouter from './handler/supplier'
import transactionRouter from './handler/transaction'

const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())

app.use('/api/v1/product', productRouter)
app.use('/api/v1/supplier', supplierRouter)
app.use('/api/v1/transcation', transactionRouter)

app.listen(process.env.PORT, ()=>{
    console.log('server is listining')
})