const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt
//const config = require('../config/mongoose');       //stackoverflow try

const User = require('../model/users');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial',
   
}

passport.use(new JWTstrategy(opts,function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log("error in finding user from JWT"); return done(err,false);
        }if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;