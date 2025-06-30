import { Request, Response } from "express";
import { supplierSchema } from "../validate/supplierSchema";
import { PrismaClient } from "../../src/generated/prisma";
import { supplierType } from "../types/supplierType";

const prisma= new PrismaClient()

const addSupplier = (async(req : Request, res : Response)=>{
    const data : supplierType = req.body;
    try{
        const validate = supplierSchema.safeParse(data);
        if(!validate.success){
            res.status(400).json({
                msg: "Invalid input"
            })
            return;
        }

        const supplier = await prisma.supplier.findFirst({
            where : {
                name : data.name,
                email : data.email,
                phone : data.phone,
                product : data.product,
                delete : false
            }
        });
        if(supplier){
            res.status(409).json({
                msg: "Supplier already exist"
            })
            return;
        }

        await prisma.supplier.create({
            data : {
                name : data.name,
                email : data.email,
                phone : data.phone,
                product: data.product
            }
        })
        res.status(201).json({
            msg : "Supplier added"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default addSupplier;