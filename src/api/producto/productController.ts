import { Context } from "hono";
import { prisma } from "../config/prisma";
import Producto from "./productType";


export const getProducts = async (c: Context) => {
    try {
        const getProducto = await prisma.producto.findMany({})

        return c.json({ message: 'Producto Obtenidos', getProducto }, 200)
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({ error: 'Error al obtener el producto' }, 400)
    }
};

export const getProductById = async (c: Context) => {
    try {
        const idx = parseInt(c.req.param("id"))

        const getId = await prisma.producto.findUnique({
            where: {
                id: idx
            }
        })

        if (!getId) {
            throw new Error('Id Not Found')
        }

        return c.json({ message: 'Producto Obtenido', getId }, 200)
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({ error: 'Error al obtener el producto' }, 400)
    }
};

export const createProduct = async (c: Context) => {

    try {
        const pro: Producto = await c.req.json()

        const producto = await prisma.producto.create({
            data: {
                nombre: pro.nombre,
                descripcion: pro.descripcion,
                precio: pro.precio,
                stock: pro.stock
            }
        })

        return c.json({ message: 'Product Created', producto }, 201)
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({ error: 'Error al crear el producto' }, 400)
    }
};

export const updateProduct = async (c: Context) => {

    try {
        const idx = parseInt(c.req.param("id"))

        const getId = await prisma.producto.findUnique({
            where: {
                id: idx
            }
        })

        if (!getId) {
            throw new Error('Id Not Found')
        }
        const pro: Producto = await c.req.json()

        const updateProducto = await prisma.producto.update({
            where: {
                id: idx
            },
            data: {
                nombre: pro.nombre,
                descripcion: pro.descripcion,
                precio: pro.precio,
                stock: pro.stock
            }
        })

        return c.json({ message: 'Product Updated',updateProducto }, 201)
    } catch (error) {
        console.error(`Error: ${error}`)
        return c.json({ error: 'Error al actualizar el producto' }, 400)
    }
};

export const deleteProduct = async (c: Context) => {
    try {
        const idx = parseInt(c.req.param("id"))

        const getId = await prisma.producto.findUnique({
            where: {
                id: idx
            }
        })

        if (!getId) {
            throw new Error('Id Not Found')
        }

        const deleteProducto = await prisma.producto.delete({
            where: {
                id: idx
            }
        })

        return c.json({ message: 'Product Deleted', deleteProducto}, 200)
    } catch (error) {
        
    }
};