'use strict';

var express=require('express');
var app=express();
var puerto=process.env.port||3000;
var bodyParser=require("body-parser");
var path=require('path');
var swig= require('swig');
var morgan = require('morgan');
var rfs=require('rotating-file-stream');
var Logeo=require('./Controlador/Logeo.js');
app.use(express.static(path.join(__dirname,"public")));//especifica 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var logdireccion=__dirname;
var tipearlog=rfs('peticiones.log',{
    interval:'2d',
    path:logdireccion
})
app.use(morgan('dev',{stream:tipearlog}));
app.engine('html',swig.renderFile);

// app.use('view engine','html');
// app.use(app.router);

app.set('views',__dirname+"/public");

app.get('/',function(req,res){
res.sendFile('index.html');
});

app.get('/login',Logeo.login);



app.post('/signup',function(req,res){
   
});
app.listen(puerto,function(){
    console.log("el servidor se esta ejecutando");
})