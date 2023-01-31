import { EUploadMimeType, TUploadableMedia, TweetV1, TwitterApi } from "twitter-api-v2";

export class TwitterMediaService {
    constructor(
        private readonly twitterClient: TwitterApi
    ) {}

    public async uploadMedia(media: TUploadableMedia, mime: EUploadMimeType | string): Promise<string> {
        try {
            return await this.twitterClient.v1.uploadMedia(media, {
                mimeType: mime
            });
        } catch (error) {
            throw error;
        }
    }
}
