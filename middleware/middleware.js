const AppError=require("../utilities/AppError")
const Triangle=require("../models/triangle")
const Review=require("../models/review")

const {triangleSchema,reviewSchema}=require("../joiSchema")

module.exports.isReviewCreator = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/triangles/${id}`);
	}
	next();
};

module.exports.isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in to do that');
		return res.redirect('/login');
	}
	next();
};

module.exports.isCreator = async (req, res, next) => {
	const { id } = req.params;
	const triangle = await Triangle.findById(id);
	if (!triangle.submittedBy.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/triangle/${id}`);
	}
	next();
};


module.exports.validateTriangleSchema=(req,res,next)=>{
	const {error}=triangleSchema.validate(req.body)
		if(error){

			const msg=error.details.map((e)=>e.message).join(",")
			throw new AppError(msg,400)
		}else{
			next()
		}
}
module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};