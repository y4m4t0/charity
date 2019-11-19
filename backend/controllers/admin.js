const User = require('../models/User')
const Fund = require('../models/Fund')

const shouldBeAdmin = (req, res, next) => {
    if(req.user.admin)
        return next()

    return res.status(401).json({ message: "Access denied. Not enough privileges confirmed..." })
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

const deleteUser = async (req, res) => {
	try{
		const user = await User.deleteOne({ _id })
		return res.status(200).json({ message: `User with id ${user.id} and name ${user.name} was succesfully removed from the Database.`})
	} catch ( err ) {
		res.status(500).json({ err })
	}
}

const deleteFund = async (req, res) => {
    try{
		const fund = await Fund.deleteOne({ _id })
		return res.status(200).json({ message: `Fund with id ${fund.id} and name ${fund.name} was succesfully removed from the Database.`})
	} catch ( err ) {
		res.status(500).json({ err })
	}
}

const updateEntity = async (req, res) => {
    const entity = Fund.findOne({ _id })
    
    if(req.body.user)
        entity = User.findOne({ _id })
    
        
    if( entity ){
        entity = req.body.newData
        entity.save()
        return res.status(200).json({ message: "Entity data was successfully updated." })
    }

    return res.status(404).json({ message: "Entity not found..." })
}

module.exports = {
    getUsersList,
    shouldBeAdmin,
    getFundsList,
    deleteUser,
    deleteFund,
    updateEntity
}