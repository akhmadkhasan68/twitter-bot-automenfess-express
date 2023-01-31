import { Request, Response } from "express";
import { SuccessResponse } from "../utils/response";
import { HttpStatusCode } from "axios";
import { TwitterTweetService } from "../services/twitter-tweet.service";
import { SchedulerService } from "../services/scheduler.service";

export class TweetController {
    constructor(
        private readonly twitterTweetService: TwitterTweetService,
        private readonly schedulerService: SchedulerService,
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
    
    public async postConfirmedTweet(req: Request, res: Response) {
        try {
            const data = await this.schedulerService.postTweetConfirmedDirectMessage();

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get data direct messages', HttpStatusCode.Ok, data));
        } catch (error) {
            res.json(error);
        }
    }


}
