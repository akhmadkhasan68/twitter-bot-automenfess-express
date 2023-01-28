import express from 'express'
import { config } from './config/config'
import configureRouter from './routes/index.routes'
import configureDI from './app.module'
import bodyParser from 'body-parser'
import { Database } from './database/database'

//init Express APP
const port = config.APPLICATION.PORT
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//init modules & routes
const diContainer = configureDI();
configureRouter(app, diContainer)

const database = new Database();

database.initDatabaseSession().authenticate().then(response => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

app.listen(port, () => console.log(`Application running on port ${port}`))
