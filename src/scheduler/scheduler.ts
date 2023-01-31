import { CronJob } from "cron";
import { SchedulerService } from "../services/scheduler.service";

export class Scheduler {
    constructor(
        private readonly schedulerService: SchedulerService,
    ) {}

    public initScheduler() {
        try {
            const schedulerEveryMinute = new CronJob('0 * * * * *', async () => {
                console.log('run sync direct message to db... 🚀');
                await this.schedulerService.syncDirectMessageToDatabase();

                console.log('run post tweet confirmed... 🚀');
                await this.schedulerService.postTweetConfirmedDirectMessage();
            });

            
            schedulerEveryMinute.start();
        } catch (error) {
            console.log(error);
            this.initScheduler();
        }
    }
}
