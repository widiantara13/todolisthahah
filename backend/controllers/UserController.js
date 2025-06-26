import User from '../models/UserModel.js';
import argon2 from 'argon2';
export const RegisterUser = async (req, res) => {
    const {email, fullName, password, confirmPassword} = req.body;
    if(!email || !fullName || !password || !confirmPassword){
        return res.status(400).json({
            msg: "Please fill in all fields"
        });
    };
    if(password !== confirmPassword){
        return res.status(400).json({
            msg: "Password and confirm password do not match"
        });
    };
    const existtingUser = await User.findOne({
        where: {
            email: email
        }
    });
    if(existtingUser){
        return res.status(400).json({
            msg: "User already exist"
        });
    };
    let hasPass = await argon2.hash(password);
    
    try {
        await User.create({
        email: email,
        fullName: fullName,
        password:hasPass
        });
        res.status(201).json({
            msg: "User created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    
    };

};

export const showUser = async(req, res) => {
    try{
        const response = await User.findAll();
        res.status(200).json({
            data: response
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};

export const ShowUserByUuid = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        if(!response){
            return res.status(404).json({
                msg: "User not found"
            });
        };
        res.status(200).json({
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    };
};

export const updateUser = async (req, res) => {
    const {email, fullName, password, confirmPassword} = req.body;
    
    try {
        const response = await User.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        if(!response){
            return res.status(404).json({
                msg: "User not found"
            });
        };
        if(password !== confirmPassword){
        return res.status(400).json({
            msg: "Password and confirm password do not match"
            });
        };
        let hasPass = await argon2.hash(password);
        await User.update({
            email: email,
            fullName: fullName,
            password:hasPass
        }, {
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json({
            msg: "User updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    
    };
};

export const deleteUser = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        if(!response){
            return res.status(404).json({
                msg: "User not found"
            });
        };
        await User.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json({
            msg: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
}
