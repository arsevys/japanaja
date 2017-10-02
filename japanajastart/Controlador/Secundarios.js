
var operaciones = require("../Modelo/Operaciones.js");

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

	static MasOpciones(req,res){

		var index = req.session.index;
		var opciones = req.session.opciones;

        var arreglo =[];

        if(opciones.length > index + 5){
             
           arreglo.push(opciones[index + 1]);
           arreglo.push(opciones[index + 2]);
           arreglo.push(opciones[index + 3]);
           arreglo.push(opciones[index + 4]);
           arreglo.push(opciones[index + 5]);
           
            var json = {
            	  state: 200,
                  lista : arreglo
            }


           req.session.index = index + 5;

           res.send(json);

        }
        else if(req.session.bool){


              req.session.bool = false;
              
              var json = {
              	state:404
              }
             
            arreglo.push(opciones[index + 1]);

               if((opciones.length == index + 2)){
               	  json.lista = arreglo;
                   res.send(json);
                   return;
               }
               else{
              
                  arreglo.push(opciones[index + 2]);

                   if((opciones.length == index + 3)){
         
                        json.lista = arreglo;
                        res.send(json);
                        return;

                   }
                   else{

                      arreglo.push(opciones[index + 3]);

                       if((opciones.length == index + 4)){
                  
                          json.lista = arreglo;
                           res.send(json);
                           return;
                       }
                       else{

                            arreglo.push(opciones[index + 4]);

                             if((opciones.length == index + 5)){
                   
                                json.lista = arreglo;
                                 res.send(json);
                                 return;
                             }
                             else{

                                 arreglo.push(opciones[index + 5]);

                                 json.lista = arreglo;
                                 res.send(json);
                                 return;

                             }

                       }

                         
                   }


               }
             
             

        }
	}

  static guardarpropuesta(req,res){
      
      

       if(req.session.ide){

         var url = require("url");

           var js = url.parse(req.url,true).query;

           console.log(js);

           comparar(js.index,req.session.opciones,(bl)=>{
               if(bl){
                          var json = {
                             cod:js.index,
                             id:req.session.ide,
                             monto: js.monto,
                             cuenta: req.session.config.cuentas[js.opc]
                         };

                         console.log(json);

                         operaciones.lanzarPropuesta(json,(text)=>{
                                  res.send(text);
                         });
               }
               else{
                console.log("igualdad");
                  res.send("No se completo la acción");
               }
           })


       }
       else {
         res.send("Inicie Seccion Porfavor !!");
       }


  }

}

module.exports=Secundarios;



function comparar(x,y,call) {
   var d = y.length;
   var bl = false;
  for (var i =0; i < y.length; i++) {

           console.log(x);
           console.log(y[i].id_opc);
          if(y[i].id_opc == x){
              bl = true;
          } 
          if((d-1 )== i){
               return call(bl); 
          }     
  }
}