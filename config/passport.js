const fs = require('fs');
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const path = require('path');
const User = require('mongoose').model('User');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

const strategy = new Strategy(options, async (payload, done) => {

  try {

    const { username } = await User.findById(payload.sub);

    if (username) {
      return done(null, { username });
    } else {
      return done(null, false);
    }
    
  } catch (err) {
    return done(err, false);
  }  

});

module.exports = (passport) => {
  passport.use(strategy);
}