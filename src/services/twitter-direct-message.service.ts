import { config } from "../config/config";
import { DirectMessageCreateV1, EDirectMessageEventTypeV1, ReceivedMessageCreateEventV1, TweetStream, TwitterApi } from "twitter-api-v2";

export class TwitterDirectMessageService {
    constructor(
        private readonly twitterClient: TwitterApi
    ) {}

    public async getListDirectMessage(): Promise<DirectMessageCreateV1[]>{
        const eventsPaginator = await this.twitterClient.v1.listDmEvents();
        const data: DirectMessageCreateV1[] = [];

        for await (const event of eventsPaginator) {
            if (event.type === EDirectMessageEventTypeV1.Create) {
                const keywords: string[] = config.TWITTER.KEYWORDS;

                const textMessage = event[EDirectMessageEventTypeV1.Create].message_data.text;
                const checkStringKeyword = keywords.some(keyword => {
                    return textMessage.toLowerCase().includes(keyword.toLowerCase());
                });

                if(checkStringKeyword) {
                    data.push(event);
                }
            }
        }

        return data;
    }

    public async deleteDirectMessages(ids: string[]): Promise<any> {
        return ids.forEach(async (id) => {
            return this.twitterClient.v1.deleteDm(id);
        });
    }
}
