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
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,        
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
    
    

}, {
    freezeTableName: true,
    timestamps: true
});

export default User;