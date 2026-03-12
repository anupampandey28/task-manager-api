import express from 'express';
import taskManagerRouter from './routes/taskmanager.router.js'
import cors from "cors"


const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json({limit:"16kb"}));


app.use(cors({
    origin:"https://taskmanager1070.vercel.app"
}));
app.get("/", (req,res)=>{
  res.send("backend working");
});
app.use('/tasks' , taskManagerRouter)
app.listen( PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
                                          