const User = require('../models/Users')

const checkAddress = async (req, res, next) => {
    const userId = req.session.userId
    const user = await User.findById(userId)

    const {street, city, state, zipCode, country} = user.address
    const phoneNumber = user.phoneNumber

    if (!street || !city || !state || !zipCode || !country || !phoneNumber) {
        const err = new Error("please fill in your details")
        next(err)
    }
    next()
}

module.exports = { checkAddress };