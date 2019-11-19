const User = require('../models/User')
const Fund = require('../models/Fund')

const shouldBeAdmin = (req, res, next) => {
    if(req.user.admin)
        return next()

    return res.status(403).json({ message: "Access denied. Not enough privileges confirmed..." })
}

const getUsersList = async (req, res) => {
    const users = await User.find()

    if(users)
        return res.status(200).json(users)

    return res.status(200).json({ message: "No users found in the Database..." })
}

const getFundsList = async (req, res) => {
    const funds = await Fund.find()

    if(funds)
        return res.status(200).json(funds)
    
    return res.status(200).json({ message: "No funds foudn in the Database..." })
}

module.exports = {
    getUsersList,
    shouldBeAdmin,
    getFundsList
}