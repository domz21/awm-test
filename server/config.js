const facebook = {
  appID: '401713836954078',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};

const google = {
  clientIDAndroid: '530288504325-lb7c89r2kh89lrf31i335u4erdjqcbqq.apps.googleusercontent.com',
  clientIDIOS: '530288504325-kjjcimv9ei7v2946s90t0cfrcortt9n1.apps.googleusercontent.com',
};

const mongo = {
  dbURI: 'mongodb://domz:jcw07051987@ds119258.mlab.com:19258/awm-test'
};

module.exports = { facebook, google, mongo };
