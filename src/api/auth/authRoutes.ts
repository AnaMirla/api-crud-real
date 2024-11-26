import { Hono } from "hono";
import { authLogin } from "./authController";
import { zLoginValidator } from "./authType";

export const authRoutes = new Hono()

authRoutes.post('/login', zLoginValidator, authLogin)