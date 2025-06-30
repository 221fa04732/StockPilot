import z from 'zod'

export const supplierSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    product : z.string()
})