import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";

const prisma= new PrismaClient()

const deleteProduct = (async(req : Request, res : Response)=>{
    const {id} : {id: string} = req.body;
    try{
        await prisma.product.update({
            data : {
                delete : true
            },
            where : {
                id : id
            }
        })
        res.status(201).json({
            msg : "Product deleted"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default deleteProduct;