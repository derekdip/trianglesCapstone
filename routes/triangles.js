const express=require("express")
const router=express.Router()
const asyncCatcher=require("../utilities/asyncCatcher")
const {triangleSchema}=require("../joiSchema")

const Triangle=require("../models/triangle")
const Review=require("../models/review")
const AppError=require("../utilities/AppError")

const { isAuthenticated,isCreator,isReviewCreator,validateTriangleSchema } = require("../middleware/middleware")



router.get("/", 
	asyncCatcher(async (req,res)=>{
		console.log("hi")
    const triangles= await Triangle.find({});
    res.render("triangles/index",{triangles})
})
)

router.get("/new",isAuthenticated,(req,res)=>{
	res.render("triangles/new")
})



router.get("/:id/edit",isAuthenticated,isCreator,
	asyncCatcher(async(req,res)=>{
	const {id}=req.params
	const triangle= await Triangle.findById(id)
	res.render('triangles/edit',{triangle})
})
)
router.get("/:id",
	asyncCatcher(async (req,res,next)=>{
	const {id}=req.params
	const triangle=  await Triangle.findById(id)
	.populate("submittedBy")
	.populate({path:"reviews",
				populate:{
					path:"author"
				}})
	console.log(triangle)
	if (!triangle) {
		req.flash("error","no triangle was found")
		res.redirect("/triangles")
		return next(new AppError('Product not found!', 404));
		
	}

	res.render("triangles/show",{triangle})
})
)
//Creating NEW TRIANGLE| triangles/new
router.post("/",validateTriangleSchema,
	asyncCatcher(async (req,res)=>{
	console.log(req.body)
	const newTriangle=new Triangle(req.body.triangle)
	newTriangle.submittedBy=req.user._id
	await newTriangle.save()
	req.flash("success","New Triangle was added")

    res.redirect("/triangles")
})
)
router.put("/:id",isAuthenticated,isCreator,validateTriangleSchema,
	asyncCatcher(async (req,res)=>{
	const {id}=req.params
	const triangle= await Triangle
	.findByIdAndUpdate(id,{...req.body.triangle})
	req.flash("success","Triangle was updated")
	res.redirect(`/triangles/${id}`)
})
)
router.delete("/:id/delete",isAuthenticated,isCreator,isReviewCreator,
	asyncCatcher(async(req,res)=>{
	const {id}=req.params
	await Triangle.findByIdAndDelete(id)
	req.flash("success","Triangle was deleted")
	res.redirect("/triangles")
})
)

module.exports=router;