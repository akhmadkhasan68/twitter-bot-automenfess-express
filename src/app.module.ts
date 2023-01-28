import DIContainer, { IDIContainer, factory, func, object, use } from "rsdi";
import { DirectMessageController } from "./controllers/direct-message.controller";
import { TwitterClientAuthService } from "./services/twitter-client-auth.service";
import { TwitterDirectMessageService } from "./services/twitter-direct-message.service";
import { TwitterApi } from "twitter-api-v2";
import { TwitterTweetService } from "./services/twitter-tweet.service";
import { TweetController } from "./controllers/tweet.controller";


export default function configureDI(): IDIContainer {
    const container: DIContainer = new DIContainer();
    
    //init twitter client API
    const twitterClientAuthService = new TwitterClientAuthService();
    const twitterClient: TwitterApi = twitterClientAuthService.initClient();

    container.add({
        [TwitterDirectMessageService.name]: object(TwitterDirectMessageService).construct(
            twitterClient
        ),
        [TwitterTweetService.name]: object(TwitterTweetService).construct(
            twitterClient
        ),
        [DirectMessageController.name]: object(DirectMessageController).construct(
            use(TwitterDirectMessageService)
        ),
        [TweetController.name]: object(TweetController).construct(
            use(TwitterTweetService)
        )
    });

    return container;
}
