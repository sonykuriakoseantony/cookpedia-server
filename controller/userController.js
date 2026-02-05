const users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// register a user 
exports.registerUserController = async(req, res) => {
    console.log("--------Inside registerUserController--------");

    const {username, email, password} = req.body;
    console.log(username, email, password);

    try{

        const existingUser = await users.findOne({email});
        if(existingUser){
            res.status(409).json("Users already exists. Please login")
        }
        else{
            let passwordHash = await bcrypt.hash(password, 10);
            const newUser = await users.create({
                username, email, password:passwordHash
            });
            res.status(201).json(newUser);
        }
        

    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}
// get all users
exports.getAllUsersController = async (req, res) => {
    console.log("--------Inside getAllUsersController--------");
    
    try{
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

// login user
exports.loginUserController = async(req, res) => {
    console.log("--------Inside loginUserController--------");
    
    const {email, password} = req.body;
    console.log(email, password);
    
    try{
        const user = await users.findOne({email});
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid){
                const token = jwt.sign({email,role:user.role}, process.env.JWT_KEY)
                res.status(200).json({
                    user:user, token
                });
            }
            else{
                res.status(401).json("Invalid email/password");
            }
        }
        else{
            res.status(404).json("User not found");
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

// get user by id
exports.getUserController = async(req, res) => {
    console.log("--------Inside getUserController--------");
    
    try{
        const userId = req.params.userId;
        const user = await users.findById(userId);
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json("User not found");
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

//get all users by admin
exports.getAllUsersController = async(req, res) => {
    console.log("--------Inside getAllUsersController--------");
    try{
        const allUsers = await users.find({role : {$eq : "user"}});
        res.status(200).json(allUsers);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

// update user profile
exports.updateUserController = async(req, res) => {
    console.log("--------Inside updateUserController--------");
    
    try{
        const userId = req.params.userId;
        const {username, email, password} = req.body;
        
        const updateData = {username, email};
        if(password){
            updateData.password = await bcrypt.hash(password, 10);
        }
        
        const updatedUser = await users.findByIdAndUpdate(userId, updateData, {new: true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

// update user image 
exports.updateUserImageController = async(req, res) => {
    console.log("--------Inside updateUserImageController--------");
    const uploadPictureFile = req.file;
    const {id} = req.params
    try{

        const existingUser = await users.findOne({_id : id});
        existingUser.picture = uploadPictureFile.filename;
        await existingUser.save();
        res.status(200).json(existingUser);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}
