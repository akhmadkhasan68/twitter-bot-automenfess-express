import { TwitterApi } from "twitter-api-v2";
import { config } from "../config/config";

export class TwitterClientAuth {
    public initClient() {
        return new TwitterApi({
            appKey: config.TWITTER.CONSUMER_KEY,
            appSecret: config.TWITTER.CONSUMER_SCRET,
            accessToken: config.TWITTER.ACCESS_KEY,
            accessSecret: config.TWITTER.ACCESS_SECRET,
        })
    }
}
