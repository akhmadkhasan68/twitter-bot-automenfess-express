import { config } from "../config/config";
import { DirectMessageCreateV1, DirectMessageCreateV1Result, EDirectMessageEventTypeV1, ReceivedDMEventV1, TwitterApi } from "twitter-api-v2";

export class TwitterDirectMessageService {
    constructor(
        private readonly twitterClient: TwitterApi
    ) {}

    public async getListDirectMessage(): Promise<DirectMessageCreateV1[]>{
        try {
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
        } catch (error) {
            throw error;
        }
    }

    public async getDetailDirectMessage(id: string): Promise<ReceivedDMEventV1> {
        try {
            const data = await this.twitterClient.v1.getDmEvent(id);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async deleteDirectMessages(ids: string[]): Promise<any> {
        return ids.forEach(async (id) => {
            return this.twitterClient.v1.deleteDm(id);
        });
    }

    public async sendDirectMessage(recepientId: string, text: string): Promise<DirectMessageCreateV1Result> {
        try {
            const data = await this.twitterClient.v1.sendDm({
                recipient_id: recepientId,
                text: 'Hello Jack!',
                // attachment: {
                //   type: 'media',
                //   media: { id: '24024092' },
                // },
            });


            return data;
        } catch (error) {
            throw error;
        }
    }
}
