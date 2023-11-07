import express from 'express';
import { user } from '../db-utils/model.js';
import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  transporter  from 'nodemailer';
import mailOptions  from 'nodemailer/lib/json-transport/index.js';
//router 
const userRouter=express.Router();
//register router
userRouter.post('/register',async function(req, res){
    try{
        const payload=req.body;
        const userCheck=await user.findOne({email:payload.email})
        if(userCheck)
        {
            res.status(409).send({message:"user already exist"})
            return;
        }
        bcrypt.hash(payload.password,10,async function(err,hash){
            if(err){
                res.status(500).send({message:"error in encrypting password"})
            }
        const userdata=new user({...payload,password:hash,id:v4()});
        await userdata.save();
        res.send({message:"user registered successfully"});
        })
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:"error in resistering user details"});
    }
})
//user login
userRouter.post('/login',async function(req,res){
    try{
        const payload=req.body;
        const userdata=await user.findOne({email:payload.email},{id:1,name:1,email:1,_id:0,password:1})
        if(userdata){
            await bcrypt.compare(payload.password,userdata.password,(_err,result)=>{
                if(result){
            
                    const responseObject=userdata.toObject();
                    delete responseObject.password;
                    const accessToken=jwt.sign({email:responseObject.email},process.env.JWT_SECRET,{expiresIn:'1d'})
                    
                    res.send({...responseObject,accessToken});
                }
                else{
                    res.status(401).send({message:"uer not found"});
                }
            })
        }else{
            res.status(404).send({message:"user is not found"});
        }
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:"error in login  "});
    }
})
//forgotPassword
userRouter.post('/forgotpassword',async(req,res)=>{
    const email=req.body.email;
    const emailfound=await user.findOne({email: email});

    try{ 
        if(emailfound){
           const token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:'1d'});
           const link=`${process.env.FRONTEND_URL}/verify?token=${token}`
            await user.updateOne({email:email},{'$set':{token:token}})
            await transporter.sendMail({...mailOptions,to:email,subject:'Password update Verification link',text:`Please verify your e-mail address using these link ${link} `})
            res.status(200).send({message:"email successfully"}) 
            console.log("email successfully"+link)
        }
        else{
            res.status(401).send({message:"user not found"});
        } 
    }
   catch(err){
    console.log(err)
    res.status(500).send({msg:"error is creating "})
   }  
})
//verifying token
userRouter.post('/verify-token',async(req,res)=>{
 
    try{ 
        const token = req.body.token;
        jwt.verify(token,process.env.JWT_SECRET,async(err,result)=>{
           console.log(result,err)
            await user.updateOne({email:result.email},{'$set':{isVerified:true}})
            res.send({msg:"user verifed"})
        });
       
    }
   catch{
    res.status(500).send({msg:"verfication failed"}) 
   }  
})
//updating password
userRouter.post('/updatePassword',async (req,res)=>{
    try{
        const payload=req.body;
        console.log(payload)
            const decodedtoken=jwt.verify(payload.token,process.env.JWT_SECRET)
           const hashedPassword=await bcrypt.hash(payload.password,10)
           console.log(decodedtoken.email,hashedPassword,payload.password)
            await user.updateOne({email:decodedtoken.email},{'$set':{password:hashedPassword,token:'',isVerified:false}});
            res.send({msg:"updated password"})
       
    
    }catch{
        res.status(500).send({msg:"passwords updation failed"})  
    }
})
export default userRouter;      