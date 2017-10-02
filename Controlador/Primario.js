var Operaciones=require('./../Modelo/Operaciones')
const DireccionPaginas={
	'PublicarAhorro':'Vista/quiero-ahorrar.ejs',
	'MisPropuestas':'Vista/tus-propuestas-opciones.ejs',
	'EligirAhorro':'Vista/quiero-efectivo.ejs'
}

class Primario {

static  MisPropuestas(req,res){
      console.log(req.session);
      if(!req.session.ide){
        res.redirect(302,"/");
        res.end();
        return;
      }
  		var config={
              'name':req.session.config.name||'',
              'perfil':req.session.config.perfil
             }; 

		    Operaciones.CargarOpcionesXUsuario(req.session.ide,(err,OA)=>{
             
          config.OpcionesActivas=OA;
         Operaciones.CargarPropuestasxUsuario(req.session.ide,(err,PA)=>{
            config.PropuestasActivas=PA;
           Operaciones.CargarPropuestasCompletadosxUsuario(req.session.ide,(err,PR)=>{
                 console.log(config);
                 config.PropuestasRealisadas=PR;
                 Operaciones.CargarOpcionesCompletadosxUsuario(req.session.ide,(err,OR)=>{
                  config.OpcionesCompletadas=OR;
                 res.render(DireccionPaginas.MisPropuestas,config);
                 });

                  })
             });
		    })
		    
 }

static PublicarAhorro(req,res){
	if(!req.session.ide){
      res.redirect(302,'/');
		return;
	}


  Operaciones.CargarTipos((err,data)=>{
  console.log(data);
   	if (req.session.ide){
	 req.session.config.tipos=data;
     res.render(DireccionPaginas.PublicarAhorro,req.session.config);
     return;
	}
 
  let config={
  	'name':"Publicar Ahorro",
  	'logeadoClass':'notLogged',
  	'tipos':data||[]
  };
  
	res.render(DireccionPaginas.PublicarAhorro,config);

  })

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
// res.statusCode = 302;
 //    res.setHeader('Location', '/' );
 //    res.end();
 res.redirect('/');
 res.end();
 }



}


module.exports=Primario;