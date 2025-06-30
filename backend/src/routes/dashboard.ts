import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";
import { productType } from "../types/productType";

const prisma= new PrismaClient()

const dashboard = (async(req : Request, res : Response)=>{
    try{
        const product= await prisma.product.findMany({
            where : {
                delete : false
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
        let activeProduct=0;
        let totalInventoryValue=0;
        let lowStockItems : productType[] = []
        product.forEach((item)=>{
            activeProduct++;
            totalInventoryValue+=(item.price*item.quantity);
            if(item.quantity<=5){
                lowStockItems.push(item)
            } 
        })

        res.status(201).json({
            data : {
                productCnt : activeProduct,
                supplierCnt : supplier,
                totalInventoryValue : totalInventoryValue,
                lowStockItems : lowStockItems,
                transaction : transaction
            }
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