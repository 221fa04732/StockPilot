import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";
import { productType } from "../types/productType";
import { UpdateproductSchema } from "../validate/productSchema";

const prisma= new PrismaClient()

const updateProduct = (async(req : Request, res : Response)=>{
    const data : productType = req.body;
    try{
        const validate = UpdateproductSchema.safeParse(data);
        if(!validate.success){
            res.status(400).json({
                msg: "Invalid input"
            })
            return;
        }
        await prisma.product.update({
            data: {
                name : data.name,
                category : data.category,
                price : data.price
            },
            where : {
                id: data.id
            }
        });
        res.status(201).json({
            msg : "Product updated"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default updateProduct;