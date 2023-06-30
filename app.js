import  express  from "express"; 
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,
}))


app.use('/users',userRouter);
app.use('/task',taskRouter);

config({
    path: "./data/config.env",
});

mongoose
    .connect(process.env.MONGO_URI,{
        dbname:'nodeapi'
    })
    .then(()=> console.log("Database Connected"))
    .catch((e)=>console.log(e));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', schema);

app.get('/', (req, res)=>{
    res.send("Nice Working");
})

app.get('/users/all', async(req,res)=>{
    const users = await User.find({});
    res.json({
        success: true,
        users,
    });
});

app.post('/user/new', async(req, res)=>{
    const {name, email, password} = req.body;
  
    await  User.create({
        name,
        email,
        password
    });

    res.json({
        success:true,
        message: "Registered Successfully",
    });
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port:${process.env.PORT}`);
})