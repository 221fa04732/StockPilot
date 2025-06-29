import { Request, Response } from "express";

const addProduct = ((req : Request, res : Response)=>{
    res.json({
        message : "api is working fine"
    })
})

export default addProduct;