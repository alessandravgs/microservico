import { sequelize } from "../database/instances/mysql.js";
import { DataTypes } from "sequelize";

export const Post = sequelize.define("Post",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    user_id:{
        type: DataTypes.BIGINT,
        allowNull:false
    }
},{tableName: "posts"});