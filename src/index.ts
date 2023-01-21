import express from 'express'
import { config } from './config/config'
import { TwitterClientAuth } from './services/tiwtter-client-auth'
import { ETwitterStreamEvent, TwitterApi } from 'twitter-api-v2'
import { TwitterDm } from './services/twitter-dm'

const app = express()
const port = config.APPLICATION.PORT
const twitterClientAuth = new TwitterClientAuth();
const client: TwitterApi = twitterClientAuth.initClient();

app.get('/', async (_, res) => {

  const titterDms = new TwitterDm(client);
  const messages = await titterDms.getListDirectMessage();

  res.status(200).send(messages);
})

app.listen(port, () => console.log(`Application running on port ${port}`))
