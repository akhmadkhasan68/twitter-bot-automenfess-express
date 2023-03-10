import { Table, Model, Column, DataType } from "sequelize-typescript";
import { DirectMessageStatusEnum } from "../../utils/enums/direct-message-status.enum";
import { IDirectMessage } from "../interfaces/direct-message.interface";

@Table({
    timestamps: false,
    tableName: "direct_messages",
})
export class DirectMessageModel extends Model implements IDirectMessage {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    message_id!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sender_id!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    created_timestamp!: string;
    
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    text!: string;
    
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    media_url!: string;

    @Column({
        type: DataType.ENUM(DirectMessageStatusEnum.PENDING, DirectMessageStatusEnum.CONFIRM, DirectMessageStatusEnum.SUCCESS, DirectMessageStatusEnum.CANCEL, DirectMessageStatusEnum.FAILED),
        allowNull: false,
        defaultValue: DirectMessageStatusEnum.PENDING
    })
    status: DirectMessageStatusEnum;

    // @Column({
    //     type: DataType.DATE,
    //     allowNull: true,
    // })
    // createdAt?: Date;

    // @Column({
    //     type: DataType.DATE,
    //     allowNull: true,
    //     defaultValue: Date
    // })
    // updatedAt?: Date;

    // @Column({
    //     type: DataType.DATE,
    //     allowNull: true,
    // })
    // deletedAt?: Date;
}
