import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

const schemaProduct = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.number(),
    stock: z.number(),
})

export const zProductValidator = zValidator('json', schemaProduct)


interface Producto {
    nombre: string
    descripcion: string
    precio: number
    stock: number
}

export default Producto