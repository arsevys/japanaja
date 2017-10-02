var pg=require('pg');
const config={
	host:'localhost',
	user:'postgres',
	database:'japanaja',
	port:'5432',
	password:'javierreyes' 
}
var pool=new pg.Pool(config);

class Operaciones {

 static CargarBancos(callback) {
    pool.connect((err,client,done)=>{
     let sql="select * from bancos";
      client.query(sql,[],(err,data)=>{
    	done();
      if(err){console.log(err);return;}
      return callback(null,data.rows);
  
     })
    })
 }

 static CargarTipos(callback){}


 static mostraropciones(id,callback) {
       
  

       pool.connect((err,client,done)=>{
        
         var sql = "select us.nom_usu ,us.estre_usu,op.mont_opc,"+
                  " cast((to_date(op.fecha_opc,'YYYY-MM-DD') + 1)"+
                  " as text) as fecha_opc,op.id_opc,us.foto_usu ,"+
                  " to_char(interval '24 hour' - (now() at time zone 'UTC' - interval '5 hour' - op.fecha_opc::timestamp),'HH24:MI:SS') as hora"+
                   " from opciones as op"+
                    " inner join usuarios as us"+
                    " on op.id_usu = us.id_usu"+
                    " where estado_opc = 'A' and"+
                    " interval '24 hour' - (now() at time zone 'UTC' - interval '5 hour' - op.fecha_opc::timestamp ) > interval '-00:00:00'";
           
           if(id.id != null){
                sql += " and not (op.id_usu = "+ id.id +") and not (op.id_opc in (select id_opc from propuestas where id_usu = "+id.id+"))";
           } 


           if(id.opc != null){
                 
                 var pro = ((id.opc / 100)*10);

                sql += " and op.mont_opc between "+(parseInt(id.opc) - pro)+" and "+ (pro + parseInt(id.opc)) ;
           } 
 
            sql += " order by op.mont_opc desc";

  


         client.query(sql,[],(err,data)=>{

                done();

                if(err){
                  return callback([]);
                } 
             
                 return callback(data.rows);

         })

       })
 }

 static consultarcuentas(id,callback){

         pool.connect((err,client,done)=>{

            let query = "select c.num_cuenta,b.nom_banco from usuarios as u"+
                " inner join cuentas as c"+
                " on u.id_usu = c.id_usu"+
                " inner join bancos as b"+
                " on c.id_banco = b.id_banco"+
                " where u.id_usu = $1";

              client.query(query,[id],(err,dato)=>{

                    if(err ||  dato.rows.length == 0){
                          return callback([{num_cuent : 'NO HAY NINGUN ',nom_banco:'NUMERO DE CUENTA'}]);
                     }
                           
                      return callback(dato.rows);

                });

           });
  
 }

 static lanzarPropuesta(json,callback){

       pool.connect((err,client,done)=>{

          let query = "select id_cuenta from cuentas"+
                     " where num_cuenta = $1 and id_usu = $2";
          
          client.query(query,[json.cuenta.num_cuenta,json.id],(err,data)=>{

              done();
              if(err){
                 console.log(err);
                return callback("No se puedo Completar la acción");
              }
              else if (data.rows.length == 1) {
                    
                    pool.connect((err,client,done)=>{

                       let query = "insert into propuestas(id_usu,mont_propu,id_cuenta,id_opc)"+
                                   " values ($1,$2,$3,$4)";
                       
                       client.query(query,[json.id,parseInt(json.monto),data.rows[0].id_cuenta,parseInt(json.cod)],(err,data)=>{
                           
                           done();

                           console.log(err);

                           if(err){
                             console.log("insert");
                              return callback("No se puedo Completar la acción");
                           }
                           else{
                              return callback("Acción Completada")
                           }

                       });

                    });

              }
              else{
                 return ;
              }

          });

       });

 }




}

module.exports=Operaciones;