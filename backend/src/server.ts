import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import productRouter from './handler/product'
import supplierRouter from './handler/supplier'
import transactionRouter from './handler/transaction'
import dashboardRouter from './handler/dashboard'
import aiRouter from './handler/ai'

const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())

app.use('/api/v1/dashboard', dashboardRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/supplier', supplierRouter)
app.use('/api/v1/transcation', transactionRouter)
app.use('/api/v1/ai', aiRouter)

app.listen(process.env.PORT, ()=>{
    console.log('server is listining')
})