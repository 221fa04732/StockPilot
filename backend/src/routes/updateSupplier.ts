import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";
import { supplierType } from "../types/supplierType";
import { supplierSchema } from "../validate/supplierSchema";

const prisma= new PrismaClient()

const updateSupplier = (async(req : Request, res : Response)=>{
    const data : supplierType = req.body;
    try{
        const validate = supplierSchema.safeParse(data);
        if(!validate.success){
            res.status(400).json({
                msg: "Invalid input"
            })
            return;
        }
        await prisma.supplier.update({
            data: {
                name : data.name,
                email : data.email,
                phone: data.phone,
                product: data.product
            },
            where : {
                id: data.id
            }
        });
        res.status(201).json({
            msg : "Supplier info updated"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default updateSupplier;