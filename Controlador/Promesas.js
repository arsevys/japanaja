
var Operaciones=require('./../Modelo/Operaciones');
class Promesas{

static sacarDatosOperaciones (){
        return new Promise((resolver,cancelar)=>{
          Operaciones.CargarOpciones(req.session.ide,(err,OA)=>{
           config.OpcionesActivas=OA;
             });
        })
      };

      

}



