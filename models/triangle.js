const mongoose=require('mongoose')
const Review=require("./review")
const Schema= mongoose.Schema

const TriangleSchema= new Schema({
    name: String,
    image:String,
    description:String,
    sides:String,
    submittedBy: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
    reviews: [{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]
})
//mongoose format to delete all the reviews tied to the triangle
TriangleSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});


module.exports = mongoose.model("Triangle",TriangleSchema)