require('dotenv').config()

//Scrapers
const { requestHandler } = require('./middleware/requestMiddleware')
const cors = require('cors')

const productRoutes = require('./routes/productRoutes')

//Converting nodejs to express
const express = require('express')

const corsOptions = {
    origin: 'http://localhost:5000',
    credentials: true,
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))

app.listen(process.env.PORT)

//Middleware
app.use(requestHandler)

//Routes to be added..
app.use("/etsy", productRoutes)
