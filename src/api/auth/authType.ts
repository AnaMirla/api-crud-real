import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

const schemaLogin = z.object({
    email: z.string().email(),
    password: z.string().max(8),
})

export const zLoginValidator = zValidator('json', schemaLogin)