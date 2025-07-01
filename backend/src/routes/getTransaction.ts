import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";

const prisma= new PrismaClient()

const getTransaction = (async(req : Request, res : Response)=>{
    const page : number = Number(req.query.page)
    try{
        const limit= 7;
        const skip= limit*page
        const transaction = await prisma.transactionHistory.findMany({
            skip: skip,
            take: limit
        })
        const totalTransaction= await prisma.transactionHistory.count()
        const hasPreviousPage= page>0
        const hasNextPage= page<Math.ceil(totalTransaction/limit)-1
        res.status(201).json({
            transaction,
            hasNextPage,
            hasPreviousPage
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default getTransaction;