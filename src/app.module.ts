import DIContainer, { IDIContainer, object, use } from "rsdi";
import { DirectMessageController } from "./controllers/direct-message.controller";
import { TwitterDirectMessageService } from "./services/twitter-direct-message.service";
import { TwitterApi } from "twitter-api-v2";
import { TwitterTweetService } from "./services/twitter-tweet.service";
import { TweetController } from "./controllers/tweet.controller";
import { Scheduler } from "./scheduler/scheduler";
import { DirectMessageRepository } from "./repositories/direct-message.repository";


export default function configureDI(twitterClient: TwitterApi): IDIContainer {
    const container: DIContainer = new DIContainer();

    container.add({
        //repository 
        [DirectMessageRepository.name]: new DirectMessageRepository,

        //service
        [TwitterDirectMessageService.name]: object(TwitterDirectMessageService).construct(
            twitterClient
        ),
        [TwitterTweetService.name]: object(TwitterTweetService).construct(
            twitterClient
        ),

        //contoller
        [DirectMessageController.name]: object(DirectMessageController).construct(
            use(TwitterDirectMessageService),
            use(DirectMessageRepository)
        ),
        [TweetController.name]: object(TweetController).construct(
            use(TwitterTweetService)
        ),

        //scheduler
        [Scheduler.name]: object(Scheduler).construct(
            use(TwitterDirectMessageService)
        ),
    });

    return container;
}
