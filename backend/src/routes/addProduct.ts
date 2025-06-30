import { Request, Response } from "express";
import { productSchema } from "../validate/productSchema";
import { PrismaClient } from "../../src/generated/prisma";
import { productType } from "../types/productType";

const prisma= new PrismaClient()

const addProduct = (async(req : Request, res : Response)=>{
    const data : productType = req.body;
    try{
        const validate = productSchema.safeParse(data);
        if(!validate.success){
            res.status(400).json({
                msg: "Invalid input"
            })
            return;
        }

        const item = await prisma.product.findFirst({
            where : {
                name : data.name,
                category : data.category,
                delete : false
            }
        });
        if(item){
            res.status(409).json({
                msg: "Item already exist"
            })
            return;
        }

        await prisma.product.create({
            data : {
                name : data.name,
                category : data.category,
                price : data.price,
                quantity : data.quantity
            }
        })
        res.status(201).json({
            msg : "Item added"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default addProduct;