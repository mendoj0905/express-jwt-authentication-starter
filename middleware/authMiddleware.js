const passport = require('passport');

async function isAuthenticated(req, res, next) {

  const isAuthenticated = await passport.authenticate('jwt', { session: false });
  console.log(isAuthenticated);

}

async function isAdmin(req, res, next) {

  console.log(req.headers.authorization);
  decodeToken(req.headers.authorization);
  next();
  // const isAdmin = res.isAdmin;

  // if (isAdmin) {
  //   next();
  // } else {
  //   res.status(404).json({ message: 'You are not an admin.' });
  // }
}

async function decodeToken(token) {
  token = token.replace('Bearer ', '');

  const jwt = token.split('.');

  const payload = Buffer.from(jwt[1], 'base64');
  console.log(JSON.parse(payload.toString('ascii')));
}

module.exports = {
  isAuthenticated,
  isAdmin
}