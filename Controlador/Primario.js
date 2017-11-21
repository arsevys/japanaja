var Operaciones=require('./../Modelo/Operaciones')
const DireccionPaginas={
	'PublicarAhorro':'Vista/quiero-ahorrar.ejs',
	'MisPropuestas':'Vista/tus-propuestas-opciones.ejs',
	'EligirAhorro':'Vista/quiero-efectivo.ejs',
  'MisDatos':'Vista/perfil.ejs',
  'Recibo_Paso2':'Vista/MisRecibos-Paso2.ejs',
  'Recibo_Paso3':'Vista/MisRecibos-Paso3.ejs',
  'Propuesta_Paso2':'Vista/MiPropuesta-Paso2.ejs',
  'Propuesta_Paso3':'Vista/MiPropuesta-Paso3.ejs'
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
              'perfil':req.session.config.perfil,
              'logeado':true,
              'logeadoClass': 'Logged'
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
                  console.log(config);
                 res.render(DireccionPaginas.MisPropuestas,config);
                 });

                  })
             });
		    })
		    
 }
static lanzarOpcion(req,res){

   
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
 req.session.url = "/QuieroEfectivo";

      var detalle = {
       id: null,
       opc : null
    }


    if(req.session.ide){
        
       detalle.id = req.session.ide ;
    } 

     if (req.session.montoQE){

           if(req.session.montoQE != null){

               detalle.opc = req.session.montoQE ;

           }

           req.session.montoQE == null;
         
     }


  
   Operaciones.mostraropciones(detalle,(x)=>{
        
        req.session.indexQE = 4 ;
        req.session.listaQE = x ;

       if(req.session.ide){
          
          Operaciones.consultarcuentas(req.session.ide,(y)=>{

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

static CerrarSession(req,res){
  req.session.destroy();
  // res.statusCode = 302;
   //    res.setHeader('Location', '/' );
   //    res.end();
   res.redirect('/');
   res.end();
 }

static filtro(req,res){

   var url = require("url");
    
   if(url.parse(req.url,true).query.num){

       var num = url.parse(req.url,true).query.num;
     
       if(num == ""){
          req.session.montoQE = null;
          res.redirect('/QuieroEfectivo');
       }
       else if (!/^[0-9]{0,3}[.]{0,1}[0-9]{0,3}$/.test(num)){
         req.session.montoQE = null;   
         res.redirect('/QuieroEfectivo');
       }
       else {
          req.session.montoQE = num;
          res.redirect('/QuieroEfectivo');
       }

  }
  else {
      req.session.montoQE = null;
     res.redirect('/QuieroEfectivo');
  }
}



static MisDatos(req,res){
  if(!req.session.ide){
      res.redirect(302,'/');
      res.end();
    return;
  }
  console.log(req.session);

  /*obtenemos la la funcion cargarDatosUsuario para el usuario*/
  Operaciones.cargarDatosUsuario(req.session.ide,(err,data)=>{
     let datos ={
      'datos':{
        'nombre':data[0].nom_usu,
        'apellido':data[0].ape_usu,
        'celular':data[0].cel_usu,
        'correo':data[0].correo_usu,
        'dni':data[0].dni_usu
       }
       }
     console.log(datos);
       Operaciones.CargarBancos((err,d)=>{
         datos.bancos=d;
         console.log(datos);
         res.status(200).render(DireccionPaginas.MisDatos,datos);
        });
  })
}

static MostrarEstadoRecibo(req,res){
 console.log(req.params)
 let id=req.params.id;
  
  if(!req.session.ide){
    res.redirect("/");
    return;
  }



   Operaciones.MostrarEstadoRecibo(req.session.ide,id,(err,d)=>{

      // console.log(d);
      
     if(d.length<=0){
        return res.status(200).send("HubofSProblemas tecnicos lo estamos resolviendo");
      }
      d=d[0];

  /*si el estadopaso es 2 esto por que esta en paso 2 y requiere eligir un postulante
  si es en paso 3 es porque ya eligio un postulante y necesita depositar lo correspondido*/

      if(d.estadopaso_opc==3){
        Operaciones.MostrarDatosPaso3XRecibo(id,(e,d1)=>{
        
         if(d1.length<=0){
        return res.send("Hubo Problemas tecnicos lo estamos resolviendo");
      }
          console.log(d1);

          let datos={
            "Nombre":d1[0].nom_usu,//nombre del usuario que 
           "IDP3":d1[0].id_p3r,
           "Estado":d1[0].estado_p3r,
           "Hora":d1[0].hora,
           "Monto":(parseFloat(d1[0].mont_opc)-parseFloat(d1[0].mont_opc)*0.025).toFixed(2),
           "Vencio":d1[0].vencio,//si es V vencio o el NV no vencio
           "FechaC":d1[0].fechac_p3r,//es la fecha cuando comfirmo el deposito
           "NumOpe":d1[0].numope_p3r,
               "Sesion":req.session,
        "Perfil":"../"+req.session.config.perfil
    
          }
          console.log(datos);
           res.status(200).render(DireccionPaginas.Recibo_Paso3,datos)
          
        })
          
        
      }
      else if(d.estadopaso_opc==2){
        let num=parseFloat(d.mont_opc).toFixed(2);
      let llenarPagina={
        "IDRecibo":d.id_opc,
        "MontoPagar":num, //el que publico el recibo
        "MontoDepositar":parseFloat(num-(num*0.025)).toFixed(2), // la opcion para el propuestos
        "Ganancia":parseFloat(num*0.025).toFixed(2),
        "Hora":d.hora,
        "Vencio":d.vencio,
        "Sesion":req.session,
        "Perfil":"../"+req.session.config.perfil
        

      }
      console.log(llenarPagina);
      Operaciones.ObtenerPostulantesDeUnRecibo(id,(err,a)=>{
        llenarPagina.Postulantes=a;
        res.status(200).render(DireccionPaginas.Recibo_Paso2,llenarPagina)

       })
      
      }

     
      

  });   
}


static notificaciones(req,res){
  console.log(req.session);

   if(req.session.ide){

     Operaciones.consultarNotificaciones(req.session.ide,(rows)=>{
       console.log(req.session);
       console.log(rows);
       Operaciones.ActualisarNotificacionXUsuario(req.session.ide);
       req.session.config.notificaciones = rows;
       res.status(200).render("Vista/notificaciones",req.session.config);
     })
       
   }
   else {
       res.redirect("/");
   }

}

static MostrarEstadoPropuesta(req,res){
 let id=req.params.id;
  if(!req.session.ide){
      res.redirect("/");  
      return;
  }

 Operaciones.MostrarEstadoPropuesta(id,req.session.ide,(err,i)=>{
  
  console.log(i);
  if(i.length==0){
    res.send("HUbo Un Problema");
    return;
  }
   i=i[0];
  if(i.estado_paso_propu==2){
    let datos={
    "Hora":i.fecha ,
    "Conteo":i.hora ,
    "Nombre":i.nom_usu ,
    "estado":i.estado_propu,
        "Sesion":req.session,
        "Perfil":"../"+req.session.config.perfil
    }

   res.status(200).render(DireccionPaginas.Propuesta_Paso2,datos) 
  }

  else if(i.estado_paso_propu==3){
    Operaciones.MostrarDatosPaso3XPropuesta(id,req.session.ide,(err,p)=>{
      console.log(p);
      p=p[0];

      let o={
        "Nombre":p.nom_usu,
        "Servicio":p.tipo_tipo,
        "NomSer":p.nom_tipo,
        "Monto":p.monto,
        "CodSum":p.codsum_opc,
        "SI":p.estado_p3p ,//N o C 
        "IdP":p.id_p3p,
        "Sesion":req.session,
        "Perfil":(req.session.config.perfil.indexOf('http://')!=-1)?req.session.config.perfil:"../"+req.session.config.perfil
      }

      console.log(p)
      console.log(o);
      res.status(200).render(DireccionPaginas.Propuesta_Paso3,o)
    })
  
  }
   
 })
  
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

      req.session.maslistaQE = false;

      return x;

    }
}