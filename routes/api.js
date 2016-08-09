/**
 * Created by sandeeptc on 7/28/16.
 */
var express=require('express');
var router=express.Router();

router.use(function(req,res,next){

    if(req.method==="GET"){
        return next();
    }
    if( !req.isAuthenticated()){
        //user not authenticated redirect to Login Page
        res.redirect('/#login');
    }
    return next();
})





router.route('/posts')

    //returns all posts
    .get(function(req,res){

        //temp soln
        res.send({message:'TODO return all posts'});

    })

    .post(function(req, res){

        //TODO create a new post in the database
        res.send({message:"TODO create a new post in the database"});
    })

    router.route('/posts/:id')

    .get(function(req,res){
        res.send({message:'TODO return post with ID'+req.params.id});

    })

    .post(function(req,res){
    res.send({message:'TODO modify post with ID'+req.params.id});
    })

    .put(function(req,res){
    res.send({message:'TODO modify put with ID'+req.params.id});
    })

    .delete(function(req,res){
    res.send({message:'TODO delete post with ID'+req.params.id});

    })


module.exports=router;