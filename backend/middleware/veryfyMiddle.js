import User from "../models/UserModel.js";

export const verifyLogin = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({
            msg: "Unauthorized"
        
        })
    };
    const response = await User.findOne({
        where: {
            uuid: req.session.userId
        }

    });
    if(!response){
        return res.status(401).json({
            msg: "User not found"
        
        });
    }
    req.userId = response.id;
    next();

}