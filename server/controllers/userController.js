const User = require('../models/Users')

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId)
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId.substring(1);
      await User.findOneAndDelete({ _id: userId });
      res.status(200).send("deleted user");
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).send({ errors });
    }
};

module.exports.updateUserDetail = async (req, res) => {
    try {
        const userId = req.session.userId
        const { address, username, phoneNumber } = req.body
        const updateFields = {};
        if (address) {
        updateFields.address = address;
        }
        if (phoneNumber) {
        updateFields.phoneNumber = phoneNumber;
        }
        if (username) {
        updateFields.username = username;
        } 

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            updateFields,
            { new: true }
          );
      
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ message: 'User information updated successfully', updatedUser });
    }catch(err) {
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
}