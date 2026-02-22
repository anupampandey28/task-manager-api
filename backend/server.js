import express from 'express';
import habitRoutes from './routes/habits.route.js'

const app = express();
app.use(express.json());


app.use('/habits' , habitRoutes)
  
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})
