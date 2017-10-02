
var Operacion=require('./../Modelo/Operaciones');


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

       Operacion.InsertarOpciones(ide,d,(err)=>
       {
       	if(err){res.send({err:true,msj:"Hubo Problemas intente mas tarde"});return;};
        res.send({err:false,msj:"Su Publicacion se realizo correctamente"});

       })






    
 }

static PublicarPropuesta(req,res){

 }


}


module.exports=Operaciones;