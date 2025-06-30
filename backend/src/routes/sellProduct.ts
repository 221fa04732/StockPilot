import { Request, Response } from "express";
import { tradeSchema } from "../validate/productSchema";
import { PrismaClient } from "../../src/generated/prisma";
import { tradeType } from "../types/tradeType";

const prisma= new PrismaClient()

const sellProduct = (async(req : Request, res : Response)=>{
    const data : tradeType = req.body;
    try{
        const validate = tradeSchema.safeParse(data);
        if(!validate.success){
            res.status(400).json({
                msg: "Invalid input"
            })
            return;
        }

        const item = await prisma.product.findFirst({
            where : {
                id : data.id,
                delete : false
            }
        });
        if(item && item.quantity<data.quantity){
            res.status(409).json({
                msg: "Invalid trade"
            })
            return;
        }

        item && await prisma.$transaction([
            prisma.product.update({
                data:{
                    quantity: item.quantity-data.quantity
                },
                where: {
                    id: item.id
                }
            }),
            prisma.transactionHistory.create({
                data:{
                    quantity: data.quantity,
                    price: item.price,
                    transactionType: 'sell',
                    productId: data.id,
                }
            })
        ])

        res.status(201).json({
            msg : "Congratulations! Sold successful"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default sellProduct;