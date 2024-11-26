import { Hono } from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import {prettyJSON} from 'hono/pretty-json'
import { userRoutes } from './api/user/userRoutes'
import { productRoutes } from './api/producto/productRoutes'
import { authRoutes } from './api/auth/authRoutes'

const app = new Hono()

//Middleware
app.use(cors())
app.use(logger())
app.use(prettyJSON())

//Routes

//Endpoints de Usuarios
app.route('/usuarios', userRoutes)
app.route('/get', userRoutes)

//Endpoints de Login
app.route('/auth', authRoutes)

//Endpoints de Productos
app.route('/productos', productRoutes)
app.route('/get', productRoutes)
app.route('/update', productRoutes)
app.route('/delete', productRoutes)


//Server
export default {
  port: 3000,
  fetch: app.fetch
}
