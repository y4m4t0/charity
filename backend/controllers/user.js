// Authentification modules
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const keys = require('../config/keys')

//validation modules
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

//User Model import
const User = require('../models/User')

const register = async (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors);
    }

    try {
        //awaiting to find User in MongoDB
        user = await User.findOne({ email: req.body.email })

        //if exist return status 400 to client
        if(user){
            return res.status(400).json({ emailRegistered: "This email is already taken by someone."});
        }

        //else:
        //generate salt and hash according to the password taken from client
        salt = await bcrypt.genSalt(10)
        hash = await bcrypt.hash(req.body.password, salt)
        
        //create object with paramterers taken from client and hashed value as its password
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        //save to Mongo
        user = await newUser.save();
        
        //return auth token
        //create payload
        const payload = {
            id: user.id,
            username: user.username
        }
        //create token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 60*60*24*7 }, (err, token) => {
            res.status(200)    
            return res.json({
                username: payload.username,
                success: true,
                token
            })
        })
        
    } catch( err ){
        console.log(err)
        return res.status(500)
    }
    
}

const login = async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const userEmail = req.body.email
    const password = req.body.password

    User.findOne({ email: userEmail })
        .then(user => {
            if(!user){
                return res.status(400).json({ emailNotFound: "Email not found"})
            }

            //check if the password is correct
            return bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch){
                    //user matched
                    const payload = {
                        id: user.id,
                        username: user.username
                    }

                    return jwt.sign(payload, keys.secretOrKey, { expiresIn: 60*60*24*7 }, (err, token) => {
                        
                        res.status(200)
                        return res.json({
                            username: payload.username,
                            success: true,
                            token
                        })
                    })   
                }

                res.status(400).json({ passwordIncorrect: "Password is wrong" }) 
            })
        })
}

const subscribeForFund = async (req, res) => {
    const user = await User.findOne({ _id: req.body.user._id })
    if( user ){
        user.subscriptions.push(req.body.fundName)
        await user.save()
        return res.status(200).json({ message: "Subscribed." })
    }

    return res.status(404),json({ message: "User not found..." })
}

const getUserInfo = async (req, res) => {
    const user = await User.findOne({ _id: req.body.user._id })
    if( user )
        return res.status(200).json(user)
    
    return res.status(404).json({ message: "User not found..." }) 
}

module.exports = {
    register,
    login,
    subscribeForFund,
    getUserInfo
}
