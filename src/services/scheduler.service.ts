import { EDirectMessageEventTypeV1 } from "twitter-api-v2";
import { IDirectMessage } from "../database/interfaces/direct-message.interface";
import { DirectMessageRepository } from "../repositories/direct-message.repository";
import { TwitterClientAuthService } from "./twitter-client-auth.service";
import { TwitterDirectMessageService } from "./twitter-direct-message.service";
import { TwitterTweetService } from "./twitter-tweet.service";
import { DirectMessageStatusEnum } from "../utils/enums/direct-message-status.enum";
import { DirectMessageModel } from "../database/models/direct-message.model";
import { TwitterQuickReplyConfirmPosyMetadataEnum } from "../utils/enums/twitter-quick-reply-confirm-post-metadata.enum";

export class SchedulerService {
    constructor(
        private readonly twitterDirectMessageService: TwitterDirectMessageService,
        private readonly twitterTweetService: TwitterTweetService,
        private readonly directMessageRepository: DirectMessageRepository,
    ) {}

    public async syncDirectMessageToDatabase(): Promise<IDirectMessage[]> {
        try {
            const messages = await this.twitterDirectMessageService.getListDirectMessage(true);
            if(messages.length == 0) {
                return [];
            }

            const messagesData = messages.map((message) => {
                return {
                    sender_id: message[EDirectMessageEventTypeV1.Create].sender_id,
                    created_timestamp: message.created_timestamp,
                    text: message[EDirectMessageEventTypeV1.Create].message_data.text,
                    media_url: message[EDirectMessageEventTypeV1.Create].message_data?.attachment.media.media_url || '',
                    status: DirectMessageStatusEnum.PENDING,
                    message_id: message.id,
                };
            });

            console.log(messagesData);

            const saveToDb = await DirectMessageModel.bulkCreate(messagesData);
            console.log(saveToDb);
            return saveToDb;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async sendConfirmationPendingDirectMessage(): Promise<any> {
        try {
            const pendingDirectMessage = await this.directMessageRepository.getAllDirectMessageFilterStatus(DirectMessageStatusEnum.PENDING);
            if(pendingDirectMessage.length == 0) {
                return [];
            }

            for(let message of pendingDirectMessage) {
                await this.twitterDirectMessageService.sendDirectMessage(message.sender_id, 'Apakah kamu yakin akan mengirim pesan diatas?', {
                    type: 'options',
                    options: [
                        {
                            label: "✅ Ya, Kirim",
                            description: "Pilih ini jika anda yakin ingin mengirim pesan diatas",
                            metadata: `${TwitterQuickReplyConfirmPosyMetadataEnum.ACCEPT}${message.id}`
                        },
                        {
                            label: "⛔️ Batalkan",
                            description: "Pilih ini jika anda ingin membatalkan pesan diatas",
                            metadata: `${TwitterQuickReplyConfirmPosyMetadataEnum.CANCEL}${message.id}`
                        },
                    ]
                });

                message.status = DirectMessageStatusEnum.CONFIRM;
                message.save();
            }
        } catch (error) {
            throw error;
        }
    }
}
