import { Dialect, Sequelize } from "sequelize";
import { config } from "../config/config";

export class Database {
    sequelize: Sequelize;

    constructor() {
        this.sequelize = this.initDatabaseSession();
    }

    public initDatabaseSession(): Sequelize {
        return new Sequelize(
            config.DATABASE.NAME,
            config.DATABASE.USERNAME,
            config.DATABASE.PASSWORD,
            {
                dialect: config.DATABASE.DIALECT as Dialect
            }
        )
    }
}
