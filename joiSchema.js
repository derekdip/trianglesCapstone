const { required } = require("joi");
const Joi =require("joi");
const { modelName } = require("./models/user");


	module.exports.triangleSchema=Joi.object({
        triangle:Joi.object({
            name:Joi.string().required(),
            image:Joi.string(),
            description:Joi.string().required(),
            sides:Joi.string().required(),
        })
			//joi.array()
	})
    
    module.exports.reviewSchema = Joi.object({
        review: Joi.object({
            body: Joi.string().required(),
            rating: Joi.number().required().min(1).max(5),
        }).required(),
    });
    
	
