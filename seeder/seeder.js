const mongoose = require('mongoose');
const Triangle=require("../models/triangle")

//Mongoose Connecting to Mongo
mongoose
	.connect('mongodb://localhost:27017/triangleDataBase', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));

const sampleData=[
    {name:"The First Triangle",description:"The origin of all right triangles",sides:"[1],[0],[1]",
	image:"https://images.unsplash.com/photo-1580702951217-55b6d61244bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
	submittedBy:"6070af2f71c7fe868cece823"
},
    {name:"The Infamous 3,4,5",description:"The most recognized right triangle in exostamce",sides:"[3],[4],[5]",
	image:"https://images.unsplash.com/photo-1580702951217-55b6d61244bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
},
    {name:"Dave",description:"One of the smaller triangles",sides:"[5],[12],[13]",
	image:"https://images.unsplash.com/photo-1580702951217-55b6d61244bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
},
    {name:"Penny",description:"Cool triangle that has a 7",sides:"[7],[24],[25]",
	image:"https://images.unsplash.com/photo-1580702951217-55b6d61244bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
},
]

// We first clear our database and then add in our trianlge sample
const seedDB = async () => {
	await Triangle.deleteMany({});
	const res = await Triangle.insertMany(sampleData)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});
