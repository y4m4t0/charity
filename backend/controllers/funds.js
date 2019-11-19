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

module.exports = {
    getFunds,
    getFundsSubsribes
}