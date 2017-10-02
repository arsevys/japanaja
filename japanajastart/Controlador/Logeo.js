var BD=require('./../Modelo/Logeo.js');

class Logeo{

static login(req,res){
var user= req.body.correo;
var comtra=req.body.password;

console.log(req.body);
        BD.LogIn(user,comtra,function(err,data){
                if(err){
                    return console.log(err);

                }
             if(data.length==0){
             	console.log("usuario incorrecto");
             	res.send({err:true,msj:"Usuario o contraseña incorrectos En caso no cuentes con un usuario puede registrarte en este <a  data-toggle='modal' data-target='#ModalRegistro' data-dismiss='modal'>Link</a>"});
             	return;
             }
                req.session.ide=data[0].dni_usu;

                req.session.nombre=data[0].nom_usu;
                req.session.config={
                	name:data[0].nom_usu,
                	logeadoClass:"Logged",
                	logeado:true,
                    perfil:"Complementos/imagenes/avatars/perfil.jpg"
                }
                res.send({err:false});
        });

}

static registrar(req,res){
    var cliente=JSON.parse(req.body.data);
    var correo=/^\S+\@\w+\.\w+$/;//correo
    var nombre=/^[a-zA-Z ]{1,110}$/;
    var dni=/^[0-9]{8}$/;
    var celular=/^[0-9]{9}$/;
    const comtra=/^[]\S{8,100}$/;
    var reporte={
    	err:true
    };
    if(!correo.test(cliente.correo)){
    	reporte.errores="Su correo debe estar escrito correctamente";
     res.send(reporte);
     return;
    }
    else if(!nombre.test(cliente.nombre)){
    	reporte.errores="Corregir el campo nombre";
     res.send(reporte);
     return;
    }
    else if(!nombre.test(cliente.apellidos)){
    	reporte.errores="Corregir el campo apellidos";
     res.send(reporte);
     return;
    }
    else if(!dni.test(cliente.dni)){
    	reporte.errores="Su Dni esta incorrecto o vacio";
     res.send(reporte);
     return;
    }
    else if(!celular.test(cliente.celular)){
    	reporte.errores="Su numero celular esta incorrecto";
     res.send(reporte);
     return;
    }
    else if(!comtra.test(cliente.comtra)){
    	reporte.errores="Su comtraseña debe tener de 8 a mas caracteres";
     res.send(reporte);
     return;
    }
   
    BD.registrar(cliente,(err,data)=>{

    	if(err){console.log(err);return;}
    	 reporte.errores="Se ah Registrado correctamente";
          reporte.err=false;
          
          res.send(reporte);

    })

}


}

module.exports=Logeo;