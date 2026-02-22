import express from 'express';
<<<<<<< HEAD
import habitRoutes from './routes/habits.route.js'
=======
import habitRoutes from './routes/todos.route.js'
>>>>>>> c53ba30 (refractor: separate routes , add validation and environment variables)

const app = express();
app.use(express.json());


<<<<<<< HEAD
app.use('/habits' , habitRoutes)
=======
app.use('/todos' , habitRoutes)
>>>>>>> c53ba30 (refractor: separate routes , add validation and environment variables)
  
app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})
