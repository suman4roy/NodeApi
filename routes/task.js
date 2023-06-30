import  express  from "express"; 
import { deleteTask, getMytasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const router = express.Router();

router.post('/all', isAuthenticated, newTask);
router.get('/my', isAuthenticated, getMytasks);
router.route('/:id').put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;
