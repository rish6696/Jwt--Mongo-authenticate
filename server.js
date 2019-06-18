const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_Connect,{ useNewUrlParser: true },()=>{
    console.log('Mongodb connected');
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const authRoute=require('./routes/auth')
const postRoute=require('./routes/posts')

app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.use('/',(req,res)=>{
    res.send('hello');
})

app.listen(4457,()=>{
    console.log('Server started')
})