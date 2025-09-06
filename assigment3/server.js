import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js"
import userRoutes from './routes/userRoutes.js'
import budgetRoutes from './routes/budgetRoutes.js'

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 7000;
app.get('/',(req,res)=>{
    res.send("National Budget API System is running...")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});