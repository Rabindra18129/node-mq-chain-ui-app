require('dotenv').config();
var express=require('express');
var app=express();

var homeRouter=require('./router/home');
var port=process.env.PORT||5000;
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', homeRouter);

app.use((req,res,next)=>{
    res.status(404).send('Not Found!');
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.render('error',{page:'Error',error:err});
});

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});