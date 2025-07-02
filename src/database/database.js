import { Sequelize } from "sequelize";
import config from '../config/env.js';

export const sequelize = new Sequelize(
    config.DB_DATABASE, //name db
    config.DB_USER, // user db
    config.DB_PASSWORD, // pass db
    {
        host: config.DB_HOST,
        dialect: config.DB_DIALECT,
        logging: console.log(),

        dialectOptions: config.DB_USE_SSL === 'true' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        } : {},
    }
);
