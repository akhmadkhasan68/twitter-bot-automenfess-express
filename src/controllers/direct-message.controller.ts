import { Request, Response } from "express";
import { TwitterDirectMessageService } from "../services/twitter-direct-message.service";
import { TwitterApi } from "twitter-api-v2";

export class DirectMessageController {
    constructor(
        private readonly twitterDirectMessageService: TwitterDirectMessageService
    ) {}

    public async listDirectMessage(req: Request, res: Response) {
        const dms = await this.twitterDirectMessageService.getListDirectMessage();

        res.status(200).send(dms);
    }
}
