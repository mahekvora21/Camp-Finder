const express = require('express');
const router=express.Router({mergeParams:true});

const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');

const Review = require('../models/review');
const Campground = require('../models/campground');
const {isLoggedIn,isAuthor,validateCampground,validateReview}=require('../middleware');
const reviews=require('../controllers/reviews');

router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview));
router.delete('/:reviewId',isLoggedIn,catchAsync(reviews.deleteReview));

module.exports=router;