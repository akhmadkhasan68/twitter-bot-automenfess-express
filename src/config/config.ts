import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    APPLICATION: {
        PORT: process.env.PORT || '3000'
    },
    TWITTER : {
        CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || '',
        CONSUMER_SCRET: process.env.TWITTER_CONSUMER_SECRET || '',
        ACCESS_KEY: process.env.TWITTER_ACCESS_KEY || '',
        ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET || '',
        KEYWORDS: JSON.parse(process.env.TWITTER_KEYWORDS) || [],
        USERNAME: process.env.TWITTER_USERNAME || '',
    },
    DATABASE: {
        HOST: process.env.DB_HOST || 'localhost',
        PORT: process.env.DB_PORT || '3306',
        USERNAME: process.env.DB_USERNAME || '',
        PASSWORD: process.env.DB_PASSWORD || '',
        NAME: process.env.DB_NAME || '',
        DIALECT: process.env.DB_DIALECT || 'mysql'
    }
};
