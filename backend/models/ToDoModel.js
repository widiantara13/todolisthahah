import { DataTypes } from 'sequelize';
import db from '../config/Config.js';
import User from './UserModel.js';
const Task = db.define('task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    do_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    is_done:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        
        allowNull: true,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true,
    timestamps: true
});

User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks'
});
Task.belongsTo(User, {foreignKey: 'userId',
   
    as: 'user'
});

export default Task