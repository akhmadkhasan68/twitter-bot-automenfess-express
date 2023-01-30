import { CronJob } from "cron";
import { SchedulerService } from "../services/scheduler.service";

export class Scheduler {
    constructor(
        private readonly schedulerService: SchedulerService,
    ) {}

    public initScheduler() {
        try {
            const schedulerEveryMinute = new CronJob('* * * * * *', async () => {
                // const getDirectMessage = await this.twitterDirectMessageService.getListDirectMessage();
                // await this.schedulerService.syncDirectMessageToDatabase();
                // await this.schedulerService.sendConfirmationPendingDirectMessage();
            });
            
            schedulerEveryMinute.start();
        } catch (error) {
            console.log(error);
        }
    }
}
