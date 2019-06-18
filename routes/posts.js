const express=require('express');
const router=express.Router();
const verifyFunction=require('../verifyToken');


router.get('/',verifyFunction,(req,res)=>{
    res.json(
        {
            posts:
            {
                title:"random",
               description:"random data that shuold be private"
            }
        }
    )
})

module.exports=router;