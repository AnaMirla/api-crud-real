import { Hono } from "hono";
import { authLogin } from "./authController";

export const authRoutes = new Hono()

authRoutes.post('/login', authLogin)