const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require('../models/user');
// configuring Passport!


// We need to adjust the callback function so that it gets called
// when a user has logged into the application using OAUTH



passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // function occurs if user has logged in via OAuth!
   

    try {
      //check to see if user is has logged in before by checking with google id 
      //to see if their google id is stored in the database
      let user = await UserModel.findOne({googleId: profile.id});
      
      
      if(user) return cb(null, user); 
      //if we find an id we will pass the user to the next piece of middleware 
      //which is our serialized user

      //if user is undefined (not an error) meaning user was not in database
      //then let's create a new user!
      user = await UserModel.create({ 
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })
      
      //pass their information to the next piece of middleware which is serialized user
      cb(null, user) 

    } catch(err) {
      cb(err)
    }

  }))



passport.serializeUser(function(user, cb) {
  cb(null, user._id); //we take the user and we take the id & this is where we put it inside of cookie
});
//cookies is what is sent back& forth from the browser to identify who is making http requests to server



//whenever we ger an http request from the client the following funtion will run 
//this is what opens up the cookie 

passport.deserializeUser(function(userId, cb) { //open cookie & take user id

    UserModel.findById(userId) //then our model goes to DB & finds that user
            .then(function(userDoc){
              cb(null, userDoc); //passport then take the request object & creating a new user property
              //req.user= userDoc and asigns it to the user id that we found in DB

            //you can then user req.user in all controler functions to reffer to the user that is logged in 
              //(logged in user mongoose document)
          }).catch(err => {
              cb(err)
            })


  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

})

