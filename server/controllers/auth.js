// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook');
// const GoogleStrategy = require('passport-google-oauth20');
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


module.exports = { };
