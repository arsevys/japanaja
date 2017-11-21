var Notifi=require("./../Modelo/Notificacion");

class Notificacion{

static Notificar(req,res){
console.log("llego!!")
if(!req.session.ide){
	res.status(200).send("dasda");
return;
}

Notifi.Obtener(req.session.ide,(e,d)=>{
	if(e){
		console.log(e,"error")
		return;
	}
	console.log("dd",d)
	res.status(200).send(d.contador);
})


}

}

module.exports=Notificacion;