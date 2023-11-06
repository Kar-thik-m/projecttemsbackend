import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const username = "sparrowkarthik007"
const dbName = "day40"
const  password =  "PK38iRPSo2IuXk2k"
const clusterName ="cluster0.vtlusor.mongodb.net"


const cloudMongoUrl = `mongodb+srv://${username}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;

const dbconnect = async ()=>{
try{
await mongoose.connect(cloudMongoUrl,{
    useNewUrlParser: true,
});
console.log('connected');
}
catch(error){
    console.log(error);
    process.exit(1);
}
};
export default dbconnect;
