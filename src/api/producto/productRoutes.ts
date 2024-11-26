import { Hono } from "hono";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./productController";

export const productRoutes = new Hono()

productRoutes.post('/create', createProduct)
productRoutes.get('/get', getProducts)
productRoutes.get('/get/:id', getProductById)
productRoutes.put('/update/:id', updateProduct)
productRoutes.delete('/delete/:id', deleteProduct)