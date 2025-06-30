import z from 'zod'

export const productSchema = z.object({
    name : z.string(),
    // image : z.string(),
    category : z.string(),
    price : z.number(),
    quantity : z.number()
})