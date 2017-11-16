
var Operacion=require('./../Modelo/Operaciones');
var notificacion = require('./../Modelo/notficaciones.js');
var OperacionCorreo=require("./Correo");
var fs=require("fs");
var path=require("path");
class Operaciones{

static PublicarOpcion(req,res){
	
	if(!req.session.ide){

     return;
	}
	try{
		var d=JSON.parse(req.body.datos);
	}
    catch(err){
        res.send({err:true,msj:"Error Inesperado intentarlo mas tarde"});
    	return;
    }
    
    let tipo=/^\d+$/;
    let codsum=/^[0-9-]{1,77}$/;
    let monto=/^[0-9]{1,6}$/;
     if(!tipo.test(d.tipo)){
       res.send({err:true,msj:"Error Inesperado"})
     	return;
     }
     else if(!codsum.test(d.codsum)){
     	res.send({err:true,msj:"Corregir Codigo de Suministro"});
        return;
     }
     else if(!monto.test(d.monto)){
      res.send({err:true,msj:"Monto no Valido"});
      return;
     }
       let ide=req.session.ide;

       Operacion.InsertarOpciones(ide,d,(err,id)=>
       {

        notificacion.realizarPublicacion(id,ide);
       	if(err){res.send({err:true,msj:"Hubo Problemas intente mas tarde"});return;};
        res.send({err:false,msj:"Su Publicacion se realizo correctamente"});

       })






    
 }

static PublicarPropuesta(req,res){

 }

static GuardarDatos(req,res){
  
  req.body.ide=req.session.ide;
  console.log(req.body);
  let i=req.body;
  let correo=/^\S+\@\w+\.\w+$/;//correo
  let nombre=/^\w+$/;
  let dni=/^\d{8}$/;
  let cuentainter=/^\d{10}$/;
  let cuenta=/^\d{12}$/;
  var reporte={
      err:true
    };

   if(!correo.test(i.correo)){
    reporte.data="Error en la casilla de Correo";
    res.send(reporte);
    return;
   }
   else if(!nombre.test(i.nombre)){
    reporte.data="Error en la casilla de Nombre";
    res.send(reporte);
    return;
   }
   else if(!nombre.test(i.apellidos)){
    reporte.data="Error en la casilla de Apellidos";
    res.send(reporte);
    return;
   }
   else if(!dni.test(i.dni)){
    reporte.data="Error en la casilla de DNI";
    res.send(reporte);
    return;
   }

   else if(!cuenta.test(i.cuenta)){
    reporte.data="Error en la casilla de Nombre";
    res.send(reporte);
    return;
   }
   else if(!cuentainter.test(i.interbana)){
    reporte.data="Error en la casilla de Apellidos";
    res.send(reporte);
    return;
   }
   else if(!dni.test(i.dni)){
    reporte.data="Error en la casilla de DNI";
    res.send(reporte);
    return;
   }




  res.send(reporte);
  // Operacion.actualisarDatos(req.body,(e,d)=>{

  // })

}
static ActualisarPaso2A3Recibos(req,res){
 console.log(req.body);

  /*obtenemos el id del usuario y el id la opcion*/
  notificacion.seleccionPropuesta(req.body.ido,req.body.ide);
 Operacion.ActualisarPaso2A3Recibos(req.body.ide,req.body.ido,req.body.idp,(err,id)=>{
  if(err){
  res.send({err:true,mensaje:"Hubo un error en el proceso"})
  return;}

OperacionCorreo.ConfirmarPostulante(id);
res.send({err:false});
});


}

/*Mostrar estado de un recibo*/

/* el usuario va enviar su numero de operacion y da a confirmar
ahora solo le faltaria la acptacion del administradpr*/
static ConfirmarDeposito(req,res){
 var o=req.body;
 console.log(o);

  Operacion.ActualisarConfirmarDepositoRecibo(o.txtD,o.p3,(err,data)=>{
  if(err){
  res.send({err:true,mensaje:"Ocurrrio Un error intente mas tarde"})
    return;
  }
  /*enviamos como parametro el id de la tabla paso3Recibos*/
 OperacionCorreo.EnviarConfirmacionAdministrador(o.p3); 
  res.send({err:false});
  });

}

/*cancelar Recibo*/
static CancelarRecibo(req,res){
  let id=req.body.i;
  console.log(id);

Operacion.CancelarRecibo(id,(err,i)=>{
if(i==1){
  res.send({err:false})
}
else{
  res.send({err:true})
}
})

}

static SubirImagen(req,res){
  let ruta=req.files.ya.path;
  let ext=path.extname(req.files.ya.name);
  let n="ID-P3P-"+req.body.i+ext;
  let nuevaruta="./public/Complementos/Depositos/"+n;
console.log(req.files,ext);
console.log(req.body);

 fs.createReadStream(ruta).pipe(fs.createWriteStream(nuevaruta));
Operacion.ActualisarConfirmarVoucherPropuesta(n,req.body.i,(e,l)=>{
  if(e){
    res.send({err:true});
    return;
  }
  OperacionCorreo.RevisarVoucher(req.body.i)

  res.send({err:false})
});
}

}


module.exports=Operaciones;