
const express=require("express")
const router=express.Router({mergeParams:true})
const Triangle=require("../models/triangle")
const Review=require("../models/review")
const AppError=require("../utilities/AppError")
const asyncCatcher=require("../utilities/asyncCatcher")
const {reviewSchema}=require("../joiSchema")
const { validateReview,isAuthenticated } = require("../middleware/middleware")




//--------- REVIEW ROUTES----------
router.delete(
	'/:reviewId',isAuthenticated,
	asyncCatcher(async (req, res) => {
		const { id, reviewId } = req.params;
		await Triangle.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
		await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review was successfully deleted")
		res.redirect(`/triangles/${id}`);
	})
);


//Creating New REVIEW ROUTE: SHOW
router.post("/",isAuthenticated,validateReview,
	asyncCatcher(async (req,res)=>{
	const {id}=req.params
	const triangle=await Triangle.findById(id)
	const review= new Review(req.body.review)
	triangle.reviews.push(review)
	await triangle.save()
	await review.save()
    req.flash("success","Review was created")
	res.redirect(`/triangles/${id}`)
})
)
module.exports=router;