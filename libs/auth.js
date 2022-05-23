const Users = require('../models/users');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = app => {
    const cfg = app.libs.configs;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt") //ExtractJwt.fromAuthHeader()
    };
    const strategy = new Strategy(params, (payload, done) => {
        const { id } = payload.id;
        Users.findById(id, (err, user) => {
            if(user) {
                return done(null, {
                    id: user.id,
                    email: user.email
                });
            }
            if (err || !user) done(null, false);
        });
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
}
