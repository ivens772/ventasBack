import express, {Router } from 'express'
import cors from 'cors'
import router from './routes'
import dbConnect from './bd/connection'
import cookieParser from 'cookie-parser'

const app = express()
dbConnect()
const PORT =  4000
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:3000', credentials:true}))
app.use(express.json())
app.use(router)

app.listen(PORT , ()=>{
    console.log("Escuchando en el puerto: " + PORT)
})