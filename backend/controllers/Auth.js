import User from '../models/UserModel.js';
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const response = await User.findOne({
            where: {
                email: email
            }
        
        });
        if(!response){
            return res.status(404).json({
                msg: "User not found"
            
            })
        };
        const match = await argon2.verify(response.password, password);
        if(!match){
            return res.status(400).json({
                msg: "Wrong password"
            });
        };
        req.session.userId = response.uuid;
        const uuid = response.uuid;
        const name = response.fullName;
        const emailUser = response.email;
        res.status(200).json({uuid, name, emailUser, msg: "Login successful"})

    } catch (error) {
         console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    };
};

export const isLogin = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({
            msg: "You are not logged in"
        });
    };
    
    const response = await User.findOne({
        where: {
            uuid: req.session.userId
        
        },
        attributes: ['uuid', 'fullName', 'email']

    });

    if(!response){
        return res.status(404).json({
            msg: "User not found"
        });
    };
    res.status(200).json(response)
};

export const Logout = async (req, res) => {
    req.session.destroy((err) =>{
        if(err){
            return res.status(400).json({
                msg: "Something went wrong"
            });
        };
        res.status(200).json({
            msg: "Logout successful"
        });
    });
    
};