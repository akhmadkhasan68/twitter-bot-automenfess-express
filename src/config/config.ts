import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    APPLICATION: {
        PORT: process.env.PORT || '8090'
    },
    TWITTER : {
        CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || '',
        CONSUMER_SCRET: process.env.TWITTER_CONSUMER_SECRET || '',
        ACCESS_KEY: process.env.TWITTER_ACCESS_KEY || '',
        ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET || '',
        KEYWORDS: JSON.parse(process.env.TWITTER_KEYWORDS) || [],
    },
};
