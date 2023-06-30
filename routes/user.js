import  express  from "express"; 
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { getAllusers, getMyprofile, login, logout, register } from "../controllers/user.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// mongoose
//     .connect("mongodb://localhost:27017",{
//         dbname:'nodeapi'
//     })
//     .then(()=> console.log("Database Connected"))
//     .catch((e)=>console.log(e));

const router = express.Router();

router.get('/all',getAllusers);

router.post('/new', register);
router.post('/login', login);
router.post('/login', logout);

router.get("/me", isAuthenticated, getMyprofile);

export default router;