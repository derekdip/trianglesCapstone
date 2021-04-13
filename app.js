if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}


const express= require("express")
const app= express()
const path=require("path")
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const AppError=require("./utilities/AppError")

//Import Routes
const triangleRoutes=require("./routes/triangles");
const reviewRoutes=require("./routes/reviews")
const authRoutes = require("./routes/users")
//session
const session= require("express-session")
const flash= require("connect-flash")

const passport=require("passport")
const PassportLocal=require("passport-local")
const User=require("./models/user")

const MongoStore=require("connect-mongo");
//const ejsMate=require("ejs-mate")
//Mongoose Connecting to Mongo

const url = process.env.DB_STRING || 'mongodb://localhost:27017/triangleDataBase'
const secret = process.env.SECRET || 'drake'

const store = MongoStore.create({
	mongoUrl:url,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret,
	},
});

// This checks for any errors that may occur.
store.on('error', (e) => {
	console.log('Store Error', e);
});

const sessionConfig = {
	store,
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
	},
};




mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));

//setting up ejs and path
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'views'))
//app.engine("ejs",ejsMate)
//Parsing the form
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Making public folder available
app.use(express.static('public'));
app.use(express.static("/calculator.js"));
app.use(express.static(path.join(__dirname, '/public')));


app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new PassportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//  ------- Middleware -------
app.use((req, res, next) => {
	res.locals.user=req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

//    ------- Routes -----------
app.get('/',(req,res)=>{
    res.render('home')
})
//----Triangle Routes------
app.use("/triangles",triangleRoutes)
//---Triangle Review Routes
app.use("/triangles/:id/reviews",reviewRoutes)
//-- User Routes----
app.use("/",authRoutes)


app.post("*",(req, res,next) => {
	next(new AppError("Page not found",404))
})
app.use((err,req,res,next)=>{
	const {status=500}=err
	const {message="I am in danger"}=err
	res.status(status).render("error",{err})
})
app.listen(3000,()=>{
    console.log('listening on port 3000')
}) 