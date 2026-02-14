const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const session = require('express-session');

const app = express();

app.use(session({ secret: 'your_secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new SteamStrategy({
    returnURL: 'https://xvqsww.github.io/clickgg/', 
    realm: 'https://xvqsww.github.io/clickgg/', 
    apiKey: '1E7AA50CE37228340F02E542F74D4CC1'
  },
  (identifier, profile, done) => {
    return done(null, profile);
  }
));

app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', 
  passport.authenticate('steam', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('/'); 
  }
);

app.listen(3000, () => console.log('Server running on port 3000'));
