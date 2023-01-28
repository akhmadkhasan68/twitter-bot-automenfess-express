import { TweetV1, TwitterApi } from "twitter-api-v2";

export class TwitterTweetService {
    constructor(
        private readonly twitterClient: TwitterApi
    ) {}

    public async postTweet(status: string, mediaIds?: string[]): Promise<TweetV1> {
        try {
            return this.twitterClient.v1.tweet(status, {
                media_ids: mediaIds
            });
        } catch (error) {
            throw error;
        }
    }
}
