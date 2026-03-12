import express from 'express';
import taskManagerRouter from './routes/taskmanager.router.js'
import cors from "cors"

const app = express();
app.use(express.json({limit:"16kb"}));


app.use(cors({
    origin:"https://taskmanager1070.vercel.app"
}));
app.use('/task' , taskManagerRouter)
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})
                                          