const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: '786224093620-9jh62qi4odes5jpflnrsbvu7012icq1s.apps.googleusercontent.com',
            clientSecret: 'Y4Z7768J2UnGcui975U0hCEQ',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function (req, accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    ));
};