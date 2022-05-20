import Users from  '../models/users';

import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

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