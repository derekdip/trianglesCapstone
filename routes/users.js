const express=require("express")
const router=express.Router()
const User=require("../models/user")
const asyncCatcher = require("../utilities/asyncCatcher")
const passport= require("passport")

router.get("/register",(req,res)=>{
        res.render('users/register')
})
router.post("/register",
asyncCatcher(async(req,res)=>{
    try{
        const {email,username,password}=req.body
        const user=new User({email,username})
        const newUser=await User.register(user,password)
        req.login(newUser,(err)=>{
			if(err)return next(e);
			req.flash("success","welcome to the triangles")
			res.redirect("/triangles")
		})
    }catch (e){
        req.flash("error",e.message)
		res.redirect("/register")
    }
}))
router.get('/login', (req, res) => {
	res.render('users/login');
});
router.get("/logout",(req,res)=>{
	req.logout()
	req.flash("success","Come back soon!")
	res.redirect("/login")
})

router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	(req, res) => {
		req.flash('success', 'Welcome back to the LACI Restaurant Hub');
		res.redirect('/triangles');
	}
);


module.exports=router