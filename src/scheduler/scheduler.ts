import { CronJob } from "cron";
import { TwitterDirectMessageService } from "../services/twitter-direct-message.service";

export class Scheduler {
    constructor(
        private readonly twitterDirectMessageService: TwitterDirectMessageService,
    ) {}

    public initScheduler() {
        const schedulerEveryMinute = new CronJob('1 * * * * *', async () => {
            // const getDirectMessage = await this.twitterDirectMessageService.getListDirectMessage();
        });
        
        schedulerEveryMinute.start();
    }
}
