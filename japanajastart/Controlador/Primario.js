 
const DireccionPaginas={
	'PublicarAhorro':'Vista/quiero-ahorrar.ejs',
	'MisPropuestas':'Vista/tus-propuestas-opciones.ejs',
	'EligirAhorro':'Vista/quiero-efectivo.ejs'
}
  
var listado = require('../Modelo/Operaciones.js');

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

  req.session.url = "/QuieroEfectivo";

      var minjs = {
       id: null,
       opc : null
    }


    if(req.session.ide){
        
       minjs.id = req.session.ideaux ;
    } 

     if (req.session.ideaux){

           if(req.session.ideaux != null){

               minjs.opc = req.session.ideaux ;

           }

           req.session.ideaux == null;
         
     }


  
   listado.mostraropciones(minjs,(x)=>{
        
        req.session.index = 4 ;
        req.session.opciones = x ;

       if(req.session.ide){
          
          listado.consultarcuentas(req.session.ide,(y)=>{

              req.session.config.lista = listacorta(x,req); ;
              req.session.config.cuentas = y;
              res.render(DireccionPaginas.EligirAhorro,req.session.config);
              return;

          });
          
           return;
       }
       else{

        let config={
          'name':"Publicar Ahorro",
          'logeadoClass':'notLogged',
          'lista':listacorta(x,req),
          'logeado':false,
          'cuentas':[{num_cuenta : 'INICIE ',nom_banco:'SESSION'}]
        };

        res.render(DireccionPaginas.EligirAhorro,config);
       }
       

    });
  
 }


static lanzarOpcion(req,res){

   
}

static CerrarSession(req,res){
	  req.session.destroy();
	  res.statusCode = 302;
    res.setHeader('Location', '/' );
    res.end();
}

static filtro(req,res){

     var url = require("url");

     var num = url.parse(req.url,true).query.num ;
 
      if (!/^([0-9])*$/.test(num)){
         req.session.ideaux = null;

         res.redirect('/QuieroEfectivo');
      }
      else {

         req.session.ideaux = num;

         res.redirect('/QuieroEfectivo');

      }
}



}


module.exports=Primario;


function listacorta(x,req){

      var lista_corta = [];

    if(x.length > 5){

      req.session.bool = true;

        lista_corta.push(x[0]);
          lista_corta.push(x[1]);
            lista_corta.push(x[2]);
              lista_corta.push(x[3]);
                lista_corta.push(x[4]);
  
        return lista_corta;
        
    }
    else {

      req.session.bool = false;

      return x;

    }
}