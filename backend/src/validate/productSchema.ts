import z from 'zod'

export const productSchema = z.object({
    name : z.string(),
    // image : z.string(),
    category : z.string(),
    price : z.number(),
    quantity : z.number()
})

export const tradeSchema = z.object({
    id : z.string(),
    quantity : z.number()
})