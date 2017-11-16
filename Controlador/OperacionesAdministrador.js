var OperacionesAdministra=require("./../Modelo/OperacionesAdministrador");
class OperacionesAdministrador {

static ConfirmarDeposito(req,res){
	console.log(req);
	console.log(req.query);
	if(!req.query.opc){
		res.send("error");
		return;
	}
	OperacionesAdministra.ConfirmarDepositoRecibo(req.query.opc,req.query.propu,(err,data)=>{

	res.send("Confirmado Correctamente")
	})
}
static ConfirmarVoucherGenerarTransaccion(req,res){
	console.log(req);
	console.log(req.query);
	let o=req.query.opc;
	let p=req.query.propu;
	if(!req.query.opc){
		res.send("error");
		return;
	}
	OperacionesAdministra.ComfirmarVoucherGenerarTransaccion(p,o,(err,data)=>{
if(err){res.send("ocurrio error");
	return;
}
	res.send("Confirmado Correctamente")
	})
}

}

module.exports=OperacionesAdministrador;