const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: '1021220819941-7bv7gcpt6cs2hpjsmeoshpkt0qq9qlrm.apps.googleusercontent.com',
        clientSecret: 'ZcEF5cuj1gaarL_lHxAg1oPQ',
        callbackURL: "http://127.0.0.1:88/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));