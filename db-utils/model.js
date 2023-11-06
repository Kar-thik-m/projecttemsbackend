import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: 'string',
        require: true,
    },
    Name: {
        type: 'string',
        require: true,
    },
   
   email:{
        type:'string',
        require: true,
    },
    password:{
        
        type:'string',
        require: true,
    },
    role:{
    type:"string",
    require:true,//admin/normal
    },
    ResetKey:{
        type:'string',
        require: true,
    }
   
});
const itemSchema = new mongoose.Schema({
    id: {
        type: 'string',
        require: true,
    },
    itemName: {
        type: 'string',
        require: true,
    },
   
    imageUrl:{
        type:'string',
        require: true,
    },
    itemType:{
        type:"string",
        require:true,
    },
    price:{
        type:"string",
        require:true,
    }
});



const user = mongoose.model('userdata', userSchema);
const item=mongoose.model('itemdata',itemSchema);

export { user,item };