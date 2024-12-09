const mongoose=require('mongoose')

const DB_URL=process.env.DB_Connect
mongoose.connect(DB_URL)
.then(()=>{
    console.log("DB Connected...");
    
}).catch((error)=>{
    console.log("DB Not Connceted",error);
    
})