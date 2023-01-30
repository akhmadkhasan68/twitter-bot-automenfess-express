import { DirectMessageStatusEnum } from "../utils/enums/direct-message-status.enum";
import { DirectMessageModel } from "../database/models/direct-message.model";

export class DirectMessageRepository {
    public async create() {
        return await DirectMessageModel.create({
            message_id: '1619365148715786244',
            sender_id: '2290801693',
            created_timestamp: '1674921712460',
            text: '[gkb] ngeluu ngeneiki wes semester tuek mikir skripsi',
            status: DirectMessageStatusEnum.PENDING,
            created_at: new Date
        });
    }

    public async getAllDirectMessageFilterStatus(status: DirectMessageStatusEnum) {
        return await DirectMessageModel.findAll({
            where: {
                status: status
            }
        });
    }
}
