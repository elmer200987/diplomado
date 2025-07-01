import { Status } from "../constants/index.js";
import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Task } from "./task.js";
import { encriptar } from "../common/bcrypt.js";
import logger from "../logs/logger.js";

export const User= sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'Username is required'
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg: 'Password is required'
            }
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Status must be active or inactive'
            }
        }
    }
});

User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async(user)=>{
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message)
        throw new Error ('error al encriptar antes de crear');
    }
})
/*User.beforeUpdate(async(user)=>{
    console.log('entro error update');
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        next(error);
    }
})*/