import { Request, Response } from "express";
import { SuccessResponse } from "../utils/response";
import { HttpStatusCode } from "axios";
import { TwitterTweetService } from "../services/twitter-tweet.service";

export class TweetController {
    constructor(
        private readonly twitterTweetService: TwitterTweetService
    ) {}

    public async postTweet(req: Request, res: Response) {
        try {
            const { status } = req.body;
            const data = await this.twitterTweetService.postTweet(status);

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get data direct messages', HttpStatusCode.Ok, data));
        } catch (error) {
            res.json(error);
        }
    }
}
