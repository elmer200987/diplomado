import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Task = sequelize.define('tasks', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'name is required'
            }
        }
    },
    done:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})