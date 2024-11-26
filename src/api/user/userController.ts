import { Context } from "hono"
import User from "./userType";
import { prisma } from "../config/prisma";

export const createUser = async (c: Context) => {
    try {
        const user: User = await c.req.json()

        const capitalName = (name: string) => {
            const nameLower = name.toLowerCase();
            return nameLower.replaceAll(/\b\w/g, (char: string) => char.toUpperCase());
        }

        const usuario = await prisma.usuario.create({
            data: {
                nombre: capitalName(user.nombre),
                email: user.email,
                password: user.password,
                dni: user.dni,
                role_id: user.role_id
            }
        })

        return c.json({ message: 'User Created', usuario }, 201)
        
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({ error: 'Error al Crear el Usuario' }, 400)
    }
};

export const getUser = async (c: Context) => {
    try {
        const getUser = await prisma.usuario.findMany({})

        return c.json({ message: 'Usuarios Obtenidos', getUser }, 200)
        
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({ error: 'Error al obtener el usuario' }, 400)
    }
}