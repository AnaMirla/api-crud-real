import { Context } from "hono";
import { prisma } from "../config/prisma";
import User from "../user/userType";
import { sign } from "hono/jwt";

export const authLogin = async (c: Context) => {
    try {
        const {email, password} : User = await c.req.json()

        if (!email || !password){
            throw new Error('Missing email or password')
        }

        const emailExists = await prisma.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!emailExists) {
            throw new Error('Email not found')
        }

        const passwordExists = await prisma.usuario.findFirst({
            where: {
                password: password
            }
        })

        if (!passwordExists) {
            throw new Error('Password incorrect')
        }

        const payload = {
            email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10,
          }

          const user = await prisma.usuario.findFirst({
            where: {
              email: email,
              password: password,
            },
          });
          
          if (!user) {
            throw new Error("Usuario no encontrado o credenciales incorrectas");
          }
          
          const token = await sign(payload, process.env.JWT_SECRET || "secret")

          return c.json({ message: 'Login Success', token, user}, 200)
          
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({error: 'Error al Iniciar Sesión'}, 400)
    }
}