import { Request, Response } from "express";
import { TwitterDirectMessageService } from "../services/twitter-direct-message.service";
import { SuccessResponse } from "../utils/response";
import { HttpStatusCode } from "axios";

export class DirectMessageController {
    constructor(
        private readonly twitterDirectMessageService: TwitterDirectMessageService
    ) {}

    public async listDirectMessage(_: Request, res: Response) {
        try {
            const data = await this.twitterDirectMessageService.getListDirectMessage();

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get data direct messages', HttpStatusCode.Ok, data));
        } catch (error) {
            res.json(error);
        }
    }

    public async getDetailDirectMessage(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = await this.twitterDirectMessageService.getDetailDirectMessage(id);

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get detail data direct messages', HttpStatusCode.Ok, data));
        } catch (error) {
            res.json(error);
        }
    }

    public async sendDirectMessage(req: Request, res: Response) {
        try {
            const { recepient_id, text } = req.body;
            const data = await this.twitterDirectMessageService.sendDirectMessage(recepient_id, text);

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success send direct messages', HttpStatusCode.Ok, data));
        } catch (error) {
            res.json(error);
        }
    }
}
