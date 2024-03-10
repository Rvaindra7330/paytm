const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken')
const {JWTSECRET} = require('./config');

const { Account, user } = require('../db');
const authMiddleware = require('./middleware');

const router = express.Router();

const zodSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    FirstName:zod.string(),
    LastName:zod.string()
}) 
router.post('/signup',async(req,res)=>{
   
    const {success} = zodSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message:"Email already taken/Incorrect Inputshi"
        })
    }
    const User= await user.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(User){
        return res.json({
            message:"Email already taken/Incorrect Inputshi2"
        })
    }
     const dbuser=await user.create(req.body)
     const userId=dbuser._id;
    await Account.create({
        userId,
        balance:1+ Math.random()*10000
     })
     const token=jwt.sign({userId},JWTSECRET);

    res.json({
        message:"User created successfully:)",
        token:token
    })
    }
)
const signinbody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})
router.post('/signin',async(req,res)=>{
    const body =req.body;
    const { success }=signinbody.safeParse(req.body);
    if(!success){
       return  res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const userexists=await user.findOne({username:body.username,
    password:body.password})
    if(userexists){
        const token = jwt.sign({userId:userexists._id},JWTSECRET);
        return res.status(200).json({
            token: token
        })
    }
    else{
        return res.status(411).json({
            message:"Error while logging in/user doesnot exist"
        })
    }
})
  const updatebody = zod.object({
    password:zod.string().optional(),
    FirstName:zod.string().optional(),
    LastName:zod.string().optional(),
  })
router.put('/',authMiddleware,async(req,res)=>{
  const { success }=updatebody.safeParse(req.body);
  if(!success){
    return res.status(411).json({
        message:"Error while updating information"
    })
  }
 await user.updateOne(req.body,{
    _id:req.userId
 })

 res.json({
    message:"Updated successfully"
 })

})

router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || "";
    
    const users = await user.find({
        $or:[
            {
                FirstName:{
                    "$regex":filter
                }
            },{
                LastName:{
                    "$regex":filter
                }
            }
        ]
    })

    res.json({
        users:users.map(user=>({
            username:user.username,
            firstname:user.FirstName,
            lastname:user.LastName,
            _id:user._id
        }))
    })
})

module.exports=router;