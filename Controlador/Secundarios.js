class Secundarios {

static Nosotros(req,res){
  if(req.session.ide){
  	res.render('Vista/quienes-somos',req.session.config);	
    return;
  }   

  var config={
	name:"Nosotros",
	logeadoClass:"notLogged",
	logeado:false
}

res.render('Vista/quienes-somos',config);

}

}

module.exports=Secundarios;