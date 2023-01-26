import express from 'express'
import { config } from './config/config'
import configureRouter from './routes/index.routes'
import configureDI from './app.module'
import bodyParser from 'body-parser'

//init Express APP
const port = config.APPLICATION.PORT
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//init modules & routes
const diContainer = configureDI();
configureRouter(app, diContainer)

app.listen(port, () => console.log(`Application running on port ${port}`))
