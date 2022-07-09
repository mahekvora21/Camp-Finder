const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview=async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author=req.user._id;
    //console.log(campground.reviews);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Review added!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview=async(req,res)=>{
    //console.log('/campgrounds/:id/reviews/:reviewId')
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success','Review deleted!');
    res.redirect(`/campgrounds/${id}`);
}