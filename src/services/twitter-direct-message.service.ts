import { config } from "../config/config";
import { DirectMessageCreateV1, DirectMessageCreateV1Result, EDirectMessageEventTypeV1, ReceivedDMEventV1, TwitterApi, ReceivedMessageCreateEventV1, MessageCreateQuickReplyV1 } from "twitter-api-v2";
import { fromBuffer } from 'file-type';

export class TwitterDirectMessageService {
    constructor(
        private readonly twitterClient: TwitterApi
    ) {}

    public async getListDirectMessage(filterKeyword: boolean = false): Promise<DirectMessageCreateV1[]>{
        try {    
            const eventsPaginator = await this.twitterClient.v1.listDmEvents();
            const data: DirectMessageCreateV1[] = [];

            for await (const event of eventsPaginator) {
                if (event.type === EDirectMessageEventTypeV1.Create) {
                    const directMessageData = event[EDirectMessageEventTypeV1.Create];
                    const messageData = directMessageData.message_data;

                    const keywords: string[] = config.TWITTER.KEYWORDS;
                    const textMessage = messageData.text;
                    const checkStringKeyword = keywords.some(keyword => {
                        return textMessage.toLowerCase().includes(keyword.toLowerCase());
                    });

                    if(checkStringKeyword && filterKeyword) {
                        // const mediaIds: string[] = [];
                        // if(messageData.attachment) {
                        //     const media: Buffer = await this.twitterClient.v1.downloadDmImage(messageData?.attachment.media.media_url);
                        //     const { mime } = await fromBuffer(media);
                        //     const mediaId = await this.twitterClient.v1.uploadMedia(media, {
                        //         mimeType: mime
                        //     });
                        //     mediaIds.push(mediaId);
                        // }
                        
                        // const tweet = await this.twitterClient.v1.tweet(textMessage, {
                        //     media_ids: mediaIds
                        // })

                        // const detailTweet = await this.twitterClient.v1.singleTweet(tweet.id_str);
                        // console.log(detailTweet)

                        // await this.twitterClient.v1.sendDm({
                        //     recipient_id: directMessageData.sender_id,
                        //     text: `Hore tweet anda berhasil dikirim! 🎉`,
                        // });

                        data.push(event);
                    } 
                    // else {
                    //     data.push(event);
                    // }
                }
            }

            // await this.deleteDirectMessages(data.map(item => item.id));

            return data;
        } catch (error) {
            console.log(error)
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

    public async deleteDirectMessages(tweetId: string | string[]): Promise<any> {
        if(Array.isArray(tweetId)) {
            return tweetId.forEach(async (id) => {
                return this.twitterClient.v1.deleteDm(id);
            });
        }

        return this.twitterClient.v1.deleteDm(tweetId);
    }

    public async sendDirectMessage(recepientId: string, text: string, quickReply?: MessageCreateQuickReplyV1): Promise<DirectMessageCreateV1Result> {
        try {
            const data = await this.twitterClient.v1.sendDm({
                recipient_id: recepientId,
                text: text,
                quick_reply: quickReply
            });

            return data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
