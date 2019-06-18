const Joi=require('@hapi/joi');

//schema for validation
const registerSchema={
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
}
const loginSchema={
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
}

const registerValidation=(data)=>{
    return Joi.validate(data,registerSchema);

}
const loginValidation=(data)=>{
   return Joi.validate(data,loginSchema)
}

module.exports={
    registerValidation,loginValidation
}