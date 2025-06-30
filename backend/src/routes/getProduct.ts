import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";

const prisma= new PrismaClient()

const getProduct = (async(req : Request, res : Response)=>{
    const page : number = Number(req.query.page)
    const searchWord : string = req.query.search as string
    try{
        const limit= 20;
        const skip= limit*page
        const product = await prisma.product.findMany({
            where : {
                delete : false,
                OR:[{
                    name : {
                        contains : searchWord,
                        mode : "insensitive"
                    },
                },{
                    category : {
                        contains : searchWord,
                        mode: "insensitive"
                    }
                }]
            },
            skip: skip,
            take: limit
        })

        const toalProduct = await prisma.product.count({
            where : {
                delete : false,
                OR:[{
                    name : {
                        contains : searchWord,
                        mode : "insensitive"
                    },
                },{
                    category : {
                        contains : searchWord,
                        mode: "insensitive"
                    }
                }]
            }
        })
        const hasPreviousPage= page>0
        const hasNextPage= page<Math.ceil(toalProduct/limit)-1
        res.status(201).json({
            product,
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

export default getProduct;