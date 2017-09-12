'use strict';

var express=require('express');
var app=express();
var puerto=process.env.port||3000;
var bodyParser=require("body-parser");
var path=require('path');
var swig= require('ejs');
var morgan = require('morgan');
var rfs=require('rotating-file-stream');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var Logeo=require('./Controlador/Logeo.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var logdireccion=__dirname;
var tipearlog=rfs('peticiones.log',{
    interval:'2d',
    path:logdireccion
})
app.use(morgan('dev'));
;
app.use(cookieParser());
app.use(session({secret:"disruptia",resave:true,saveUninitialized:true}));

// app.engine('html',swig.renderFile)
app.use('view engine','ejs');
app.set('views',__dirname+"/public");
app.use(express.static(path.join(__dirname,"public")));//especifica 
app.get('/',function(req,res){
res.sender('index',{name:"Andy Robers Javier Reyes"});
});
// app.route('/').get(function(req,res){
// 		res.render('index.html'); })


// }app.post('/login',Logeo.login);
// app.post('/register',Logeo.registrar);


// app.post('/signup',function(req,res){
   
// });
app.listen(puerto,function(){
    console.log("el servidor se esta ejecutando");
})