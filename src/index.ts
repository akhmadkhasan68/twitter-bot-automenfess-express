import express from 'express'
import { config } from './config/config'
import configureRouter from './routes/index.routes'
import configureDI from './app.module'

//init Express APP
const app = express()
const port = config.APPLICATION.PORT

//init modules & routes
const diContainer = configureDI();
configureRouter(app, diContainer)

app.listen(port, () => console.log(`Application running on port ${port}`))
