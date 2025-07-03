import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";
import { productType } from "../types/productType";

const prisma= new PrismaClient()

const dashboard = (async(req : Request, res : Response)=>{
    try{
        const product= await prisma.product.findMany({
            where : {
                delete : false
            },
            orderBy:{
                createdAt : "desc"
            }
        });
        const supplier= await prisma.supplier.count({
            where : {
                delete : false
            }
        })
        const transaction= await prisma.transactionHistory.findMany({
            take: 5,
            orderBy : {
                createdAt : 'desc'
            }
        })
        const transactionTrack= await prisma.transactionHistory.findMany({})
        let totalSell=0;
        let totalBuy=0;
        transactionTrack.forEach((item)=>{
            if(item.transactionType==='buy'){
                totalBuy+=item.price
            }
            else{
                totalSell+=item.price
            }
        })
        let activeProduct=0;
        let totalInventoryValue=0;
        let lowStockItems : productType[] = []
        product.forEach((item)=>{
            activeProduct++;
            totalInventoryValue+=(item.price*item.quantity);
            if(item.quantity<=100){
                lowStockItems.push(item)
            } 
        })

        res.status(201).json({
            productCnt : activeProduct,
            supplierCnt : supplier,
            totalInventoryValue : totalInventoryValue,
            lowStockItems : lowStockItems,
            transaction : transaction,
            totalBuy : totalBuy,
            totalSell : totalSell
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default dashboard;