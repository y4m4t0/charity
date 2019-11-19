const Fund = require('../models/Fund')

const getFunds = async (req, res) => {
    try{
        const funds = await Fund.find()

        if(funds) 
            return res.status(200).json(funds)
     
        return res.status(200).json({ message: "No funds found in the database..." })
    } catch ( err ) {
        res.status(500).json(err)
    }
}

const getFundsSubsribes = async (req, res) => {
    res.status(200).json({ message: "API is not completed yet..." })    
}

const getFundInfo = async (req, res) => {
    const fund = await Fund.findOne({ _id: req.body.fund._id })
    if(fund)
        return res.status(200).json(fund)
    
    res.status(404)
}

module.exports = {
    getFunds,
    getFundsSubsribes,
    getFundInfo
}