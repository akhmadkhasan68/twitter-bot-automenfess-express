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
    
    public async showDetailTweet(tweetId: string): Promise<TweetV1> {
        try {
            return this.twitterClient.v1.singleTweet(tweetId, {
                include_card_uri: true,
                tweet_mode: 'extended',
                include_entities: true,
                include_ext_alt_text: true,
            });
        } catch (error) {
            throw error;
        }
    }
}
