const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');

const { issueJWT } = require('../lib/utils');
const {
  saveUser,
  login,
  getAll,
  patch,
} = require('../controller/users').UserController
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')
const { getUser } = require('../middleware/getUser')

router.get('/protected', passport.authenticate('jwt', { session: false }), isAdmin, (req, res, next) => {
  res.status(200).json({ success: true, message: 'You are authorized' });
});

router.get('/all', isAdmin, async (req, res, next) => {
  const users = await getAll();
  return res.json({ users });
});

router.post('/login', async (req, res, next) => {

  const { username, password } = req.body;
  const user = await login(username, password);

  if (user) {
    const { token, expires } = issueJWT(user);
    res.json({ success: true, user, token, expiresIn: expires });
  } else {
    res.json({ success: false, message: 'No user found or incorrect password' })
  }

});

router.post('/register', async function(req, res, next){

  const { username, password } = req.body;
  
  const newUser = await saveUser(username, password);

  const { token, expires } = issueJWT(newUser);

  res.json({ success: true, user: newUser, token, expiresIn: expires })

});

router.patch('/:id', getUser, async function(req, res, next) {

  const pathchedUser = await patch(res.user.id, req.body);

  res.json(pathchedUser);
});

router.get('/:id', getUser, async function(req, res, next) {
  
  const user = res.user;

  res.json(user);

});

module.exports = router;