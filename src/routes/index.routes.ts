import { IDIContainer } from "rsdi";
import { DirectMessageController } from "../controllers/direct-message.controller";
import * as core from 'express-serve-static-core';
import { SuccessResponse } from "../utils/response";
import { TweetController } from "../controllers/tweet.controller";

export default function configureRouter(app: core.Express, diContainer: IDIContainer) {
    const direcMessageController = diContainer.get(DirectMessageController);
    const tweetController = diContainer.get(TweetController);

    app.get('/', (_, res) => {
        res.json(SuccessResponse.setSuccessRespose("Welcome to Twitter Automenfess API", 200, []));
    })

    app.get('/direct-message', direcMessageController.listDirectMessage.bind(direcMessageController));
    app.get('/direct-message/:id', direcMessageController.getDetailDirectMessage.bind(direcMessageController));
    app.post('/direct-message', direcMessageController.sendDirectMessage.bind(direcMessageController));

    app.post('/tweet', tweetController.postTweet.bind(tweetController));
}
