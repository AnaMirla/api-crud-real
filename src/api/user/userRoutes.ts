import { Hono } from "hono";
import { createUser, getUser } from "./userController";
import { zUserValidator } from "./userType";

export const userRoutes = new Hono()

userRoutes.post('/create', zUserValidator, createUser)
userRoutes.get('/get', getUser)