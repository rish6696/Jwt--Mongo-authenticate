const express=require('express');

const router=express.Router();

const User=require('../models/users');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation} =require('../validation');




router.post('/register',async (req,res)=>{
    console.log(req.body)

    //validate the body 
    const {error}=registerValidation(req.body)
    if(error)
    {
        return res.status(400).send(error.details[0].message)
    }

    //check if the user exits 
    const emailexits =await User.findOne({
        email:req.body.email
    }) 
   
    if(emailexits)  return res.status(400).send('Email already exists');

    // //bcrypt the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,10);
    
    
     
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    try{
    const savedUser= await user.save();
    res.send(savedUser);
    }
    catch(err)
    {
        res.status(400).send(err)
    }
    
})

router.post('/login',async (req,res)=>{
    const {error}=loginValidation(req.body)
    if(error)
    {
        return res.status(400).send(error.details[0].message)
    }

     //check if the user exits 
     const user =await User.findOne({
        email:req.body.email
    }) 
    if(!user)  return res.status(400).send('Email not registered');
    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid Password")

    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

   

})



module.exports=router;