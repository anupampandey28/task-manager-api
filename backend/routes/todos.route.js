import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/' , async(req , res) => {
    try {
        const result = await pool.query('SELECT * FROM todos')
        res.status(200).json(result.rows  )
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/' , async(req , res)=>{
    try {
        const {name} = req.body;
        // Validation
        if(!name || name.trim() === ''){
            return res.status(400).json({error: "Name is Required"})
        }
        const result = await pool.query('INSERT INTO todos (name) VALUES ($1) RETURNING *' , [name.trim()]);
        res.status(201).json(result.rows[0])       
    } catch (error) {
    console.error(error);
    res.status(500).send('Database connection failed');  
    }
})

router.put('/:id',async(req , res) =>{
    try {
        const {id} = req.params;
        const {name} = req.body;
        const result = await pool.query('UPDATE todos SET name = $1 WHERE id =$2 RETURNING *', [name , id])
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.delete('/:id' , async(req , res)=>{
try {
    const {id }= req.params;
    const result = await pool.query('DELETE FROM todos WHERE id = $1',[id])
    res.status(200).json({message : "Habit deleted succesfully"})
} catch (error) {
    res.status(500).json({error:error.message})
}
})

export default router;