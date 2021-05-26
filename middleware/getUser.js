const mongoose = require('mongoose');
const User = mongoose.model('User');

async function getUser(req, res, next) {
  try {
    
    const { _id, username, isAdmin } = await User.findById(req.params.id);

    if (!username) {
      return res.status(404).json({ message: 'Cannot find User.' });
    } 

    res.user = { id: _id, username, isAdmin };

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  next();
}

module.exports = {
  getUser
}