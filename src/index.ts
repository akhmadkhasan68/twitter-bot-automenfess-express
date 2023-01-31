import express from 'express';
import { config } from './config/config';
import configureRouter from './routes/index.routes';
import configureDI from './app.module';
import bodyParser from 'body-parser';
import { Scheduler } from './scheduler/scheduler';
import { TwitterClientAuthService } from './services/twitter-client-auth.service';
import { TwitterApi } from 'twitter-api-v2';
import connection from './database/config';

//init Express APP
const port = config.APPLICATION.PORT
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//init database
connection.sync({ alter: true })
.then(() => {
  console.log("Database successfully connected... 🚀");
})
.catch((err) => {
  console.log("Error", err);
});

//init twitter client API
const twitterClientAuthService = new TwitterClientAuthService();
const twitterClient: TwitterApi = twitterClientAuthService.initClient();

//init modules & routes
const diContainer = configureDI(twitterClient);
configureRouter(app, diContainer)

//init scheduler
const scheduler = diContainer.get(Scheduler);
scheduler.initScheduler.bind(scheduler.initScheduler());

app.listen(port, () => console.log(`Application running on port ${port}... 🚀`))
