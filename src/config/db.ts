import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// Dotenv configuration
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*"],
  logging: false,
});
/* ?ssl=true connection force */

export default db;
