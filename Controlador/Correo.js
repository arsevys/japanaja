const email=require("nodemailer");
var OperacionCorreo=require("./../Modelo/Correo.js")
const serv="https://d02f2172.ngrok.io"
const config={
service :"Gmail",
secure:true,
auth:{
	user:"disruptiabot@gmail.com",
	pass:"nodejs1997"
}
}
const administrador="andyrobersjavierreyes@gmail.com";
class Correo{

/*Aqui se envia al postulante un correo diciendo que fue el eligido de la propuesta y solo
le faltaria la espera del usuario que confirme el deposito */
static ConfirmarPostulante(x){
 var envio =email.createTransport('SMTP',config);
	OperacionCorreo.CargarDatosUsuario(x,(err,i)=>{
    if(err){console.log(err);return;}
     console.log(i[0].correo_usu)
     var option={
	from:"disruptiabot@gmail.com",
	to:"andyrobersjavierreyes@gmail.com"||i[0].correo_usu,
	subject:"Tu Propuesta ah sido aceptada",
	html:`<div>
	<p style='color:black;'>Tu Propuesta ah sido aceptada por el Usuario
	${i[0].nombre} de la publicacion del recibo de ${i[0].nom_tipo} por ${i[0].mont_opc}
	</p>
	</div>`
     };
    envio.sendMail(option,(err,result)=>{
    	if(err){console.log(err);return;}console.log("se envio");
    })

	})
}

/* cuando el usuario confirma se le enviara al administeador para que haga la aceptacion*/
static EnviarConfirmacionAdministrador(x){
  var envio =email.createTransport('SMTP',config);
	OperacionCorreo.CargarDatosConfirmacionRecibo(x,(err,i)=>{
    if(err){console.log(err);return;}
     console.log(i[0].correo_usu)
     var option={
	from:"disruptiabot@gmail.com",
	to:administrador,
	subject:"Necesita revisar Esta Confirmacion",
	html:`<div>
	<p style='color:black;'> 
     Usted tiene una nueva revisión de confirmacion de la publicacion del usuario ${i[0].nom_usu}
     de su recibo ${i[0].nom_tipo}  de ${parseFloat(i[0].mont_opc).toFixed(2)} .<br>
     Monto a depositar :<span style="color:green"> ${parseFloat(i[0].monto).toFixed(2)}</span><br>
     Numero De Operacion : <span style="color:purple">${i[0].numope}</span><br>
     Link para confirmar correctamente el numero de Operacion:
     <a href="http://localhost:3000/AdminConfirmarDepositoRecibo?opc=${i[0].id_opc}&propu=${i[0].id_propu}" target="_blank">Click para confirmar</a>
	</p>
	</div>`
     };
     console.log(option);
    envio.sendMail(option,(err,result)=>{
    	if(err){console.log(err);return;}console.log("se envio");
    })

	})
}

/*cuando el usuario de la propuesta envia su voucher el administrador
lo revisara y hara la transaccion*/

static RevisarVoucher(x){
	  var envio =email.createTransport('SMTP',config);
	OperacionCorreo.CargarDatosVoucherPropuesta(x,(err,i)=>{
    if(err){console.log(err);return;}
     console.log("dc " , i);
     var option={
	from:"disruptiabot@gmail.com",
	to:administrador,
	subject:"Necesitas Comfimar este Voucher",
	html:`<div>
	<p style='color:black;'> 
     El usuario ${i.nom} ha subido la foto de su voucher de la publicacion
     de ${i.nom_usu} por su ${i.tipo_tipo}  de ${i.nom_tipo} por ${i.mont_opc}
     <center>
     <img src='${serv}/Complementos/Depositos/${i.foto_p3p}' width='250' height='320'>
     </center>
     <a href="http://localhost:3000/GeneraTransaccion?opc=${i.id_opc}&propu=${i.id_propu}&p3p=${i.id_p3p}" target="_blank">Click para confirmar</a>
	</p>
	</div>`
     };
     console.log(option);
    envio.sendMail(option,(err,result)=>{
    	if(err){console.log(err);return;}console.log("se envio");
    })

	})
}


}

module.exports=Correo;