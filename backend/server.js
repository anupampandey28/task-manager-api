import express from 'express';
import todoRoutes from './routes/todos.route.js'
import cors from "cors"

const app = express();
app.use(express.json({limit:"16kb"}));


app.use(cors({
    origin:"http://localhost:5173"
}));
app.use('/todos' , todoRoutes)
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})
                                          