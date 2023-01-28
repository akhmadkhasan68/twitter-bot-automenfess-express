import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { DirectMessageModel } from "./models/direct-message.model";
import { Dialect } from "sequelize";

const connection = new Sequelize({
  dialect: config.DATABASE.DIALECT as Dialect,
  host: config.DATABASE.HOST,
  username: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  logging: false,
  models: [
    DirectMessageModel
  ],
});

export default connection;
