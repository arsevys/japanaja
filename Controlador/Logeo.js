var BD=require('./../Modelo/Logeo.js');

class Logeo{

static login(req,res){
var user= req.body.correo;
var comtra=req.body.password;

        BD.LogIn(user,comtra,function(err,data){
                if(err){
                    return console.log(err);
                }
        });

}

static registrar(req,res){
    var cliente=JSON.parse(req.body.data);
    var correo=/^\S+\@\w+\.\w+$/;//correo
    var nombre=/^[a-zA-Z ]{5,110}$/;
    var dni=/^[0-9]{8}$/;
    var celular=/^[0-9]{9}$/;
    const comtra=/^\S{8,100}$/;
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
    reporte.errores="Se ah Registrado correctamente";
          reporte.err=false;
          
          res.send(JSON.stringify(reporte));
    // BD.registrar(cliente,(err,data)=>{
    // 	if(err){console.log(err);return;}

    // })

}


}

module.exports=Logeo;