var pg=require('pg');
const config={
  host:'localhost',
  user:'postgres',
  database:'japanaja',
  port:'5432',
  password:'andy'
}
var pool=new pg.Pool(config);

class notificacion {

   static realizarPropuesta (json,cod_pro,usu_opc){

      console.log("Ingresando Notificacion");

       pool.connect((err,client,done)=>{

            let query = `insert into notificaciones(id_tn,id_opc,id_propu,id_usu) values `+`(1,`+parseInt(json.cod)+`,`+cod_pro+`,`+json.id+`)`;
                                                
                client.query(query,[],(err,data3)=>{

                   console.log(err);

                   let query = `insert into notificaciones(id_tn,id_opc,id_propu,id_usu) values `+`(2,`+parseInt(json.cod)+`,`+cod_pro+`,`+usu_opc+`)`;
                                                
                    client.query(query,[],(err2,data4)=>{

                    done();

                      console.log(err2);

                    });


                });


       });

                      
   }

   static realizarPublicacion (idopc,idusuario) {
       console.log("Ingresando Notificacion");

       pool.connect((err,client,done)=>{

            let query = `insert into notificaciones(id_tn,id_opc,id_usu) values `+`(3,`+idopc+`,`+idusuario+`)`;
                                                
                client.query(query,[],(err,data3)=>{

                   console.log(err);
                
                   done();


                });


       });
   }

   static seleccionPropuesta(idopc,idusuario){
      
       console.log("Ingresando Notificacion");

       pool.connect((err,client,done)=>{

            let query = `insert into notificaciones(id_tn,id_opc,id_usu) values `+`(4,`+idopc+`,`+idusuario+`)`;
                                                
                client.query(query,[],(err,data3)=>{

                   console.log(err);
                
                   done();


                });


       });

   }

   static verificaciondetiempo(id){

       pool.connect((err,client,done)=>{

            let query = `select *  from opciones where id_usu = $1  and estado_opc = 'A' and fecha_opc  < to_char((timezone('UTC'::text, now()) - '29:00:00'::interval),'YYYY-MM-DD HH24:MI:SS')`;
                                                
                client.query(query,[id],(err,data)=>{

                   if(err){
                      console.log("Error en la verificacion de tiempo");
                   }
                   else {
                      
                       data.rows.forEach((x)=>{

                          let query1 = "update opciones set estado_opc = 'C' where id_opc = $1";

                        client.query(query1,[x.id_opc],(err2,data2)=>{
                        });

                           var t = x.fecha_opc.split(' ');
                           var ft = t[0].split('-');
                           var xs = parseInt(ft[2]) + 1; 
                           var sr = ft[0]+'-'+ft[1]+'-'+xs+' '+t[1]; 
                           
                           var query2 = `insert into notificaciones(id_tn,id_opc,id_usu,fecha_not) values (5,$1,$2,$3)`;
                         
                           client.query(query2,[x.id_opc,id,sr],(err4,data4)=>{

                           });

                           
                            let query4 = 'select * from propuestas where id_opc = $1';

                            client.query(query4,[x.id_opc],(err3,data3)=>{

                                data3.rows.forEach((x2)=>{
                                    var t = x.fecha_opc.split(' ');
                                    var ft = t[0].split('-');
                                    var xs = parseInt(ft[2]) + 1; 
                                    var sr = ft[0]+'-'+ft[1]+'-'+xs+' '+t[1];                        
                                    var query5 = `insert into notificaciones(id_tn,id_opc,id_usu,fecha_not) values (6,$1,$2,$3) `;
                                    client.query(query5,[x.id_opc,x2.id_usu,sr],(err4,data4)=>{

                                        console.log("Compretado");

                                    });
                                });

                            });

                            

                       });


                   }


                });


       });

   }
   
   
   static verificacionderespuestatiempo(id){

       console.log("Ingresando Notificacion");

       pool.connect((err,client,done)=>{

            let query = `select *,o.id_opc as idopc ,o.id_usu as usuopc,p.id_usu as usupro ,o.fecha_opc as ide from propuestas as p inner join opciones as o on p.id_opc = o.id_opc where p.id_usu = $1  and o.estado_opc = 'A' and o.fecha_opc  < to_char((timezone('UTC'::text, now()) - '29:00:00'::interval),'YYYY-MM-DD HH24:MI:SS')`;
                                                
                client.query(query,[id],(err,data)=>{


                     data.rows.forEach((x)=>{
        
                        let query1 = "update opciones set estado_opc = 'C' where id_opc = $1";

                        client.query(query1,[x.idopc],(err2,data2)=>{
        
                        });

                         var t = x.ide.split(' ');
                         var ft = t[0].split('-');
                         var xs = parseInt(ft[2]) + 1; 
                         var sr = ft[0]+'-'+ft[1]+'-'+xs+' '+t[1];   

                        var query2 = `insert into notificaciones(id_tn,id_opc,id_usu,fecha_not) values (5,$1,$2,$3) `;
                        
                        client.query(query2,[x.idopc,x.usuopc,sr],(err4,data4)=>{

                        });
                        
                        
                        let query3 = 'select * from propuestas where id_opc = $1';

                        client.query(query3,[x.idopc],(err3,data3)=>{  

                            data3.rows.forEach((x2)=>{
                                var t = x.ide.split(' ');
                                var ft = t[0].split('-');
                                var xs = parseInt(ft[2]) + 1; 
                                var sr = ft[0]+'-'+ft[1]+'-'+xs+' '+t[1];                        
                                var query4 = `insert into notificaciones(id_tn,id_opc,id_usu,fecha_not) values (6,$1,$2,$3) `;

                                console.log(x2);
                                console.log("...............");
                                client.query(query4,[x.idopc,x2.id_usu,sr],(err4,data4)=>{

                                    console.log("Completado");

                                });
                            });

                        });

                     });

                });


       });

   }




}


module.exports = notificacion;

