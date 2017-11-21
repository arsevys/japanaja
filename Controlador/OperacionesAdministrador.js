var OperacionesAdministra=require("./../Modelo/OperacionesAdministrador");
var notificacion = require('./../Modelo/notficaciones.js');

class OperacionesAdministrador {

static ConfirmarDeposito(req,res){

	if(!req.query.opc){
		res.send("error");
		return;
	}

	OperacionesAdministra.ConfirmarDepositoRecibo(req.query.opc,req.query.propu,(err,data)=>{
    notificacion.confirmadeposito(req.query.opc,req.query.propu);
	res.send("Confirmado Correctamente")
	})
}
static ConfirmarVoucherGenerarTransaccion(req,res){
	
	let o=req.query.opc;
	let p=req.query.propu;

	if(!req.query.opc){
		res.send("error");
		return;
	}

	OperacionesAdministra.ComfirmarVoucherGenerarTransaccion(p,o,(err,data)=>{
		notificacion.confirmatranzaccion(req.query.opc,req.query.propu);
		if(err){
			console.log(err);
			res.send("ocurrio error");
			return;
		}

		res.send("Confirmado Correctamente");

	})
}

}

module.exports=OperacionesAdministrador;