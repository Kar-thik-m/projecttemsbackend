import express from "express";
import { user } from "../db-utils/model.js";
import becrypt from "bcrypt"
import { v4 } from "uuid";
import Jwt from "jsonwebtoken";
import transporter from "nodemailer";
import mailOptions from "nodemailer/lib/json-transport/index.js";

const userRouter=express.Router();



userRouter.post('/register', async (req, res) => {

    try {
        const payload = req.body;
        const appUser = await user.findOne({ email: payload.email }, { id: 1, Name: 1, email: 1, _id: 0 });
        if (appUser) {
            res.status(409).send({ msg: 'user already exits' });
            return;
        }
        
        becrypt.hash(payload.password, 10, async function (err, hash) {
            if (err) {
                res.status(500).send({ msg: 'Error in registring' });
                return;
            }
            const authuser = new user({ ...payload, password: hash, id: v4(), isVerified: false });
            await authuser.save();
        })
        res.send({ msg: 'user register successfully ' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error in creating' })
    }
});

userRouter.post('/login', async function (req, res) {
   try {
    const payload = req.body;
    const appUser = await user.findOne({ email: payload.email }, { id: 1, name: 1, email: 1, password: 1, _id: 0 });
    if (appUser) {

        const link = `${process.env.FRONTEND_URL}/?reset=${resetKey}`
        await  transporter.sendMail({ ...mailOptions, to: payload.email, text: `please verify  ${link}` });
    }

   } catch (err) {
    
    console.log(err);
    res.status(404).send({ msg: 'user not found' });
    
   }

});
export default userRouter;


             
