/**
 * Created by sandeeptc on 7/30/16.
 */

var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    phone:String
});

//declaring a model called User which has a Schema called userSchema!
mongoose.model("User",userSchema);