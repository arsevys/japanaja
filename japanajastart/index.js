'use strict';
 
var express=require('express');
var app=express();
var puerto=process.env.port||3000;
var bodyParser=require("body-parser");
var path=require('path');
var ejs= require('ejs');
var morgan = require('morgan');

var cookieParser=require('cookie-parser');
var session=require('express-session');
var Logeo=require('./Controlador/Logeo.js');
var Secundarios=require('./Controlador/Secundarios.js');
var Primario=require('./Controlador/Primario.js');
var passport = require("passport");
var Strategy = require('passport-facebook').Strategy; 
var connectionFB = require("./Modelo/FB.js");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var logdireccion=__dirname;
// // var tipearlog=rfs('peticiones.log',{
//     interval:'2d',
//     path:logdireccion
// // })
passport.use(new Strategy({
    clientID: 809251815920265,
    clientSecret: 'f603b1df391fa3bb696bfe134606bd0d',
    callbackURL: 'http://localhost:3000/registrar/facebook/return'
  },
    function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));


app.use(morgan('dev'));
//notLogged -- Logged
app.use(cookieParser());
app.use(session({secret:"disruptia",resave:true,saveUninitialized:true}));
app.set('view engine','ejs');
app.set('views',__dirname+"/public");
app.use(express.static(path.join(__dirname,"public")));//especifica 
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var s = "http://graph.facebook.com/1394296637357195/picture";

app.use(passport.initialize());
app.use(passport.session());

//Peticiones GET
app.get('/registrar/facebook',passport.authenticate('facebook'));



app.get('/',function(req,res){

  req.session.url = "/";

	if(req.session.ide){
	res.render('index',req.session.config);	
	return;
  }


	var config={
		name:"Inicio",
		logeadoClass:"notLogged",
		logeado:false,
    perfil:"Complementos/imagenes/avatars/perfil.jpg"
	}

	res.render('index',config);

});

app.get('/registrar/facebook/return', 
   passport.authenticate('facebook', { failureRedirect: '/' }),
   function(req, res) {
      
      connectionFB.registrar(req.user._json,(user)=>{
          // req.session.photo = user.foto_usu;
          req.session.name = user.nom_usu;
          req.session.ide = user.id_usu;

          req.session.config={
                	name:user.nom_usu,
                	logeadoClass:"Logged",
                	logeado:true,
                  perfil:user.foto_usu
                }
           res.redirect( req.session.url );   
    });
});

app.get('/masopciones',Secundarios.MasOpciones);

app.get('/Nosotros',Secundarios.Nosotros);

app.get('/MisPropuestas',Primario.MisPropuestas);

app.get('/QuieroAhorrar',Primario.PublicarAhorro);

app.get('/QuieroEfectivo',Primario.ElegirAhorro);

app.get('/signup',Primario.CerrarSession);

app.get('/login',(req,res)=>{

	var config={
		name:"Andy Robers Javier Reyes",
		logeadoClass:"notLogged",
		logeado:false
	}
	res.render('index',config);
 })

app.get('/propuesta',Primario.lanzarOpcion);

app.get('/filtros',Primario.filtro);

app.get('/registrarPropuesta',Secundarios.guardarpropuesta);

//Peticiones POST

app.post('/login',Logeo.login);
app.post('/register',Logeo.registrar);



app.listen(puerto,function(){
    console.log("el servidor se esta ejecutando");
})