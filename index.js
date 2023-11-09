import express  from "express";
import cors from "cors";
import dbconnect from "./db-utils/mongoconnect.js";
import userRouter from "./routes/user.js";
import itemRouter from "./routes/item.js";



const app = express();
const PORT =process.env.PORT || 4444;

await dbconnect();
app.use(cors());
app.use(express.json());

app.use('/user',itemRouter);
app.use("/user",userRouter);

app.get('/',  (req, res)=> {
  res.send('item catalog');
})

app.listen(PORT,()=>{console.log("run api app")});