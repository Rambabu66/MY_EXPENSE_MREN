const express= require('express')
const app=express()
require('dotenv').config()
// Import DB
require('./Modules/db')

const bodyparcel=require('body-parser')
const cors=require('cors')


// imnport Rouning
const authrouter=require('./Router/AuthRouter')
const expensesRouter=require('./Router/ExpensesRouter')
const ensureAuthentication = require('./Middleware/Authen')


// Port number
const port=process.env.PORT | 5000;


// middleware conncted
app.use(bodyparcel.json())
app.use(cors())
app.use('/auth',authrouter)
app.use('/expenses',ensureAuthentication,expensesRouter)



app.listen(port,()=>{
    console.log(`Server is runing ${port}`);
    
})


