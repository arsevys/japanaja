
const DireccionPaginas={
	'PublicarAhorro':'Vista/quiero-ahorrar.ejs',
	'MisPropuestas':'Vista/tus-propuestas-opciones.ejs',
	'EligirAhorro':'Vista/quiero-efectivo.ejs'
}

class Primario {

static  MisPropuestas(req,res){

		let config={};	
		    
		    res.render(DireccionPaginas.MisPropuestas,config)
 }

static PublicarAhorro(req,res){
  let config={
  	'name':"Publicar Ahorro",
  	'logeadoClass':'notLogged'
  };
  
	res.render(DireccionPaginas.PublicarAhorro,config);
    }

static ElegirAhorro(req,res){
  let config={
  	'name':"Publicar Ahorro",
  	'logeadoClass':'notLogged'
  };
  res.render(DireccionPaginas.EligirAhorro,config);
 }

static CerrarSession(req,res){
	req.session.destroy();
	res.statusCode = 302;
    res.setHeader('Location', '/' );
    res.end();
 }



}


module.exports=Primario;