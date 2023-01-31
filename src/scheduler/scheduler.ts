import { CronJob } from "cron";
import { SchedulerService } from "../services/scheduler.service";

export class Scheduler {
    constructor(
        private readonly schedulerService: SchedulerService,
    ) {}

    public initScheduler() {
        try {
            const schedulerEveryMinute = new CronJob('0 * * * * *', async () => {
                await this.schedulerService.syncDirectMessageToDatabase();
                await this.schedulerService.postTweetConfirmedDirectMessage();
            });

            
            schedulerEveryMinute.start();
        } catch (error) {
            console.log(error);
        }
    }
}
