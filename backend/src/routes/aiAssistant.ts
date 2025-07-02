import { Request, Response } from "express";
import { PrismaClient } from "../../src/generated/prisma";
import OpenAI from 'openai';

const prisma = new PrismaClient()

const aiAssistant = async(req: Request, res: Response) =>{
    const {userQuery} = req.body;
    try{
        const products = await prisma.product.findMany({
            where: { delete: false },
        });
        const suppliers = await prisma.supplier.findMany({
            where: { delete: false },
        });
        const histories = await prisma.transactionHistory.findMany({});

        const systemPrompt = `
            You are an expert inventory assistant. You are given data from three tables: Products, Suppliers, and Transaction Histories.
            Here is the current inventory data:

            Products:
            ${JSON.stringify(products, null, 2)}

            Suppliers:
            ${JSON.stringify(suppliers, null, 2)}

            Transaction Histories:
            ${JSON.stringify(histories, null, 2)}

            IMPORTANT RULES:
            - ONLY answer based on the data provided above.
            - If the user's question is not related to the data or cannot be answered from it, respond with: "⚠️ Sorry, the data does not support this query."
            - Be concise and clear in your response.
            `;

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPEN_API_KEY,
        });
        const response = await openai.chat.completions.create({
            model: 'openai/gpt-4o',
            max_tokens: 1000,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userQuery },
            ],
        });
        res.status(201).json({
            answer: response.choices[0].message.content
        })
    }
    catch(e){
        res.status(500).json({
            msg: "server error"
        })
    }
}
export default aiAssistant;