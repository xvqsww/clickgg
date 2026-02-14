const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;

const app = express();

app.use(session({
  secret: "sekret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new SteamStrategy({
    returnURL: "https://clickgg.onrender.com/auth/steam/return",
    realm: "https://clickgg.onrender.com/",
    apiKey: process.env.STEAM_API_KEY 
  },
  (identifier, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get("/auth/steam",
  passport.authenticate("steam")
);

app.get("/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
app.use(express.static("public"));

app.listen(3000);
