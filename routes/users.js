const express = require('express');
const passport = require('passport');
const router=express.Router();
const User=require('../models/user');
const catchAsync=require('../utils/catchAsync');
router.get('/register',(req,res)=>{
    res.render('users/register')
});

router.post('/register',catchAsync(async(req,res,next)=>{
    try{
    const{email,username,password}=req.body
    const user=new User({email,username});
    const registeredUser=await User.register(user,password);
    req.login(registeredUser,err=>{
        if(err)return next(err);
        req.flash('success','Welcome to GoCamping!');
        res.redirect('/campgrounds');
    })
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}));

router.get('/login',(req,res)=>{
    res.render('users/login');
});
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    //console.log(req.session);
    console.log(req.session.returnTo);  
    const redirectUrl=req.session.returnTo || '/campgrounds';
    req.flash('success','Welcome back');
    delete req.session.returnTo;
    //console.log(redirectUrl);
    console.log(req.session);
    res.redirect(redirectUrl);
});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { console.log(err);return next(err); }
      req.flash('success','Goodbye!');
      res.redirect('/campgrounds');
    });
});
module.exports=router;