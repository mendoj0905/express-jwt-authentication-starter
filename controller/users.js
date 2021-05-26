const mongoose = require('mongoose');
const User = mongoose.model('User');
const { genPassword, validPassword } = require('../lib/utils');

module.exports.UserController = {
  saveUser: async (username, password, isAdmin) => {
    
    try {
      const { salt, hash } = genPassword(password);

      const newUser = new User({
        username,
        hash, 
        salt, 
        isAdmin
      });

      return await newUser.save();
    } catch (err) {
      return err
    }
     
  },
  login: async (username, password) => {
    
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return false;
      }

      if(await validPassword(password, user.hash, user.salt)) {
        return user;
      } else {
        return false;
      }
      
    } catch (err) {
      return err;
    }
  },
  get: async (id) => {
    return await User.findById(id);
  },
  getAll: async () => {
    
    try {
      return await User.find();;
    } catch (error) {
      return error
    }

  },
  patch: async (id, body) => {
    
    try {
 
      const patchUser = await User.findByIdAndUpdate(id, body, { new: true });

      return patchUser;
      
    } catch  (error) {
      return error
    } 

  }
}