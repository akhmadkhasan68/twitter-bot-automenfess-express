import DIContainer, { IDIContainer, factory, func, object, use } from "rsdi";
import { DirectMessageController } from "./controllers/direct-message.controller";
import { TwitterClientAuthService } from "./services/twitter-client-auth.service";
import { TwitterDirectMessageService } from "./services/twitter-direct-message.service";
import { TwitterApi } from "twitter-api-v2";


export default function configureDI(): IDIContainer {
    const container: DIContainer = new DIContainer();
    
    //init twitter client API
    const twitterClientAuthService = new TwitterClientAuthService();
    const twitterClient: TwitterApi = twitterClientAuthService.initClient();

    container.add({
        [TwitterDirectMessageService.name]: object(TwitterDirectMessageService).construct(
            twitterClient
        ),
        [DirectMessageController.name]: object(DirectMessageController).construct(
            use(TwitterDirectMessageService)
        )
    });

    return container;
}
