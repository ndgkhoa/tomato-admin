import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import foodRoutes from './routes/foodRoutes.js'

const app = express()
const port = 4000

dotenv.config()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/food', foodRoutes)
app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
