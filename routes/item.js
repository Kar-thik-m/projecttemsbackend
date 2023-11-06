import express  from "express";

import  {item as model} from "../db-connect/model.js";
import { v4 } from "uuid";
const itemRouter=express.Router();




itemRouter.post("/create",async(req,res)=>{
   
    try{
     
     const item=new model({...req.body,id:v4()});
     await item.save();
         res.send({msg:' created '});
     }catch(err){
         console.log(err);
         res.status(500).send({msg:'Error in creating'})
     }
     });


     itemRouter.get('/electronic', async (req, res) => {
        try {
          
          const products = await model.find({ itemType: 'electronic' });
          res.json(products);
        } catch (err) {
          console.error(err);
          res.status(500).send({ msg: 'Error' });
        }
      });


      
      
  itemRouter.get('/fashion', async (req, res) => {
    try {
      
      const products = await model.find({ itemType: 'fashion' });
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: 'Error' });
    }
  });


  itemRouter.get('/furnitures', async (req, res) => {
    try {
      
      const products = await model.find({ itemType: 'furnitures' });
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: 'Error' });
    }
  });
     export default itemRouter;