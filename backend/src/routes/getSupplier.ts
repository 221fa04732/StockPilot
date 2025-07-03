import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";

const prisma= new PrismaClient()

const getSupplier = (async(req : Request, res : Response)=>{
    const page : number = Number(req.query.page)
    const searchWord : string = req.query.search as string
    try{
        const limit= 10;
        const skip= limit*page
        const supplier = await prisma.supplier.findMany({
            where : {
                delete : false,
                OR:[{
                    name : {
                        contains : searchWord,
                        mode : "insensitive"
                    },
                },{
                    product : {
                        contains : searchWord,
                        mode: "insensitive"
                    }
                }]
            },
            skip: skip,
            take: limit,
            orderBy:{
                createdAt: "desc"
            }
        })

        const toalSupplier = await prisma.supplier.count({
            where : {
                delete : false,
                OR:[{
                    name : {
                        contains : searchWord,
                        mode : "insensitive"
                    },
                },{
                    product : {
                        contains : searchWord,
                        mode: "insensitive"
                    }
                }]
            }
        })
        const hasPreviousPage= page>0
        const hasNextPage= page<Math.ceil(toalSupplier/limit)-1
        res.status(201).json({
            supplier,
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

export default getSupplier;