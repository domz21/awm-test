const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

//import app oauth configs
const config = require('../config');

//fb profile to user obj
const transformFacebookProfile = (profile) => ({
  oauth_id: profile.id,
  name: profile.name,
  avatar: profile.picture.data.url,
});

//google profile to user obj
const transformGoogleProfile = (profile) => ({
  oauth_id: profile.id,
  name: profile.displayName,
  avatar: profile.image.url,
});

//fb passport strategy
passport.use(new FacebookStrategy(config.facebook,
  async(accessToken, refreshToken, profile, done) => done(null, await createOrGetUserFromDb(transformFacebookProfile(profile._json)))));

//google passport strategy
passport.use(new GoogleStrategy(config.google,
  async (accessToken, refreshToken, profile, done) => done(null, await createOrGetUserFromDb(transformGoogleProfile(profile._json)))));

const createOrGetUserFromDb = async (userProfile) => {
  let user = await User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
  if(!user){
    user = new User({
      oauth_id: userProfile.oauth_id,
      name: userProfile.name,
      avatar: userProfile.avatar,
    });
    await user.save();
  }
  return user;
};

//serialize user to sessions
passport.serializeUser((user, done) => done(null, user));

//deserialize
passport.deserializeUser((user, done) => done(null, user));

const fbLogin = passport.authenticate('facebook');
const fbMiddleware = passport.authenticate('facebook', { failureRedirect: '/auth/facebook' });

const googleLogin = passport.authenticate('google', { scope: ['profile'] });
const googleMiddleware = passport.authenticate('google', { failureRedirect: '/auth/google' });

//callbacks
const oauthCallback = async (req, res) => {
  res.redirect('ayewandermalolos://login?user=' + JSON.stringify(req.user));
};

module.exports = { fbLogin, fbMiddleware, googleLogin, googleMiddleware, oauthCallback };
