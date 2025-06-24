import {DataTypes } from 'sequelize';
import db from '../config/Config.js';

const User = db.define('user', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    fullName: {
        type: DataTypes.STRING,        
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userName: {
        type: DataTypes.STRING,        
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,        
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    url:{
        type:DataTypes.STRING,
        allowNull:true
    },
    

}, {
    freezeTableName: true,
    timestamps: true
});

export default User;