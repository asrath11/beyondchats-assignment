import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import scrapeRouter from './routes/scrape.route.js'

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())
app.use(morgan('dev'))
app.use('/scrape',scrapeRouter)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('API running...')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
