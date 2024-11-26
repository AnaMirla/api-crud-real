import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

const schemaRegister = z.object({
    password: z.string().max(8),
    email: z.string().email(),
    nombre: z.string(),
    dni: z.string(),
    role_id: z.number(),
})

export const zUserValidator = zValidator('json', schemaRegister)



interface User {
    email: string
    nombre: string
    dni: string
    password: string
    role_id: number
}

export default User