/**
 * Created by sandeeptc on 7/29/16.
 */
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose =require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {

        //tell passport which id to use for user
        console.log('serializing user:',user._id);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        //console.log('De serializing user:',users[username]);
        //return user Object back
        User.findById(id,function(err,user){
            if(!user){
                return done('User not found',false);
            }
            if(err){
                return done(err,false);
            }
            //we found the user and we are sending the user to the passport
            return done(err,user);

        });

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },

        function(req, username, password, done) {

            User.findOne({username:username},function(err,user){

                console.log('Hello from  login');
                console.log(username);
                console.log(password);
                if(err){
                    console.log('err');
                    return done(err,false);
                }
                if(!user){
                    console.log('user not found');
                    return done('user' +username +' not found!',false);
                }
                if(!isValidPassword(user,password)){
                    console.log('Incorrect password');
                    return done('InCorrect password',false);
                }

                return done(null,user);
            });

        })
    );

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req,username,password,done) {
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err, false);
                }
                if (user) {
                    console.log('Username already exists');
                    return done(null, false);
                }


                else {
                    //Add users to DB
                    var newUser = new User();

                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.firstname = req.param('firstName');
                    newUser.lastname = req.param('lastname');
                    newUser.email = req.param('email');
                    newUser.phone = req.param('phone');

                    //Save the User
                    newUser.save(function (err, newUser) {
                        if (err) {
                            return done(err, false);
                        }
                        console.log("Successfully Signed up user" + username);
                        console.log(done);
                        return done(null, newUser);
                    });
                }
            });

        })
    );

    var isValidPassword = function(user, password){
        console.log(password);
        console.log(user.password);
        var result= bCrypt.compareSync(password, user.password);
        if(result){
            console.log("Password Correct");
        }
        else{
            console.log("Password Incorrect");
        }
        return result;
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
