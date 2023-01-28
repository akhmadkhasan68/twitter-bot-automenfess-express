import { DirectMessageStatusEnum } from "../../utils/enums/direct-message-status.enum";

export interface IDirectMessage {
    id: string;
    sender_id: string;
    created_timestamp: string;
    text: string;
    media_url: string;
    status: DirectMessageStatusEnum,
    message_id: string;
}
