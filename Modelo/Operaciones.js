var pg=require('pg');
var config=require("./../configBD.json");
var pool=new pg.Pool(config);

class Operaciones {
static cargarDatosUsuario(x,callback){
 pool.connect(function(err,client,done){
         
      client.query("select * from usuarios where id_usu=$1",[x],(err,data)=>{
       if(err){console.log(err);return;}
       done();
       return callback(null,data.rows);
      });
});

}


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

 static CargarTipos(callback) {
    pool.connect((err,client,done)=>{
     let sql="select * from tipos";
      client.query(sql,[],(err,data)=>{
    	done();
      if(err){console.log(err);return;}
      return callback(null,data.rows);
     })
    })
 }

static InsertarOpciones(id,i,callback){
   console.log(id);
     pool.connect((err,client,done)=>{
     		let sql =`insert into opciones (id_usu,mont_opc,num_cuent_opc,id_tipo,codsum_opc)
     		          values($1,$2,$3,$4,$5) returning id_opc`;
     		let parametros=[id,i.monto,'45646645',i.tipo,i.codsum];
     		
     		client.query(sql,parametros,(err,data)=>{
     			done();
     			if(err){
            console.log(err);
            callback(err,null);return;
          };

     			callback(null,data.rows[0].id_opc);

     		})  

     // let sql1=`
        
     // `;
     // let parametros1=[];
     // client.query(sql1,parametros1,(err,data)=>{
     //  if(err){console.log(err);return;}
     //  console.log(data);
     //  done();
     // });
     

 	    })
  }

static CargarOpcionesXUsuario(id,callback){
  pool.connect((err,client,done)=>{
    let sql=`
        select o.id_opc,o.estado_opc ,o.mont_opc,t.nom_tipo,
    to_char(interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - o.fecha_opc::timestamp),'HH24:MI:SS') as hora 
    from opciones o inner join tipos t
    on t.id_tipo=o.id_tipo inner join usuarios u
    on u.id_usu=o.id_usu
    where  o.estado_opc='A' and u.id_usu=$1 and
    interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - o.fecha_opc::timestamp ) > interval '-00:00:00'
    order by o.id_opc desc limit 5
    `;
    let parametros=[id];
     client.query(sql,parametros,(err,data)=>{
     done();
     if(err){console.log(err);return callback(err,null);}

     return callback(null,data.rows);
     })

  })
}


static CargarPropuestasxUsuario(id,callback){
    pool.connect((err,client,done)=>{
          let sql=`
       select to_char(interval '24 hour' - (now() at time zone 'UTC' -interval '5 hour'-o.fecha_opc::timestamp),'HH24:MI:SS') as hora,
         u.id_usu,u.nom_usu,u.ape_usu,b.nom_banco  ,p.id_propu,o.fecha_opc,o.codsum_opc,t.nom_tipo,o.mont_opc
        from propuestas p
        inner join usuarios u
        on p.id_usu=u.id_usu
        inner join opciones o
        on o.id_opc=p.id_opc
        inner join tipos t
        on t.id_tipo=o.id_tipo
        inner join cuentas c
        on c.id_cuenta=p.id_cuenta
        inner join bancos b
        on b.id_banco=c.id_banco
        where u.id_usu=$1 and p.estado_propu='A' and
        interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - o.fecha_opc::timestamp ) > interval '-00:00:00'



          `;
          let parametros=[id];
          client.query(sql,parametros,(err,data)=>{
          if(err){console.log(err);return;}
        done();
          return callback(null,data.rows);

          })

        })
    }

static CargarPropuestasCompletadosxUsuario(id,callback){
   pool.connect((err,client,done)=>{
          let sql=`
           
        --sacar propuesta realisadas
        select u.nom_usu,u.foto_usu,u.estre_usu ,ti.nom_tipo,o.mont_opc,t.id_trans,t.fecha_trans,o.mont_opc * 0.025  ahorrado
        from transacciones t
        inner join propuestas p
        on t.id_propu=p.id_propu
        inner join opciones o
        on o.id_opc=t.id_opc
        inner join usuarios u
        on u.id_usu=o.id_usu
        inner join tipos ti
        on ti.id_tipo=o.id_tipo
        where p.id_usu=$1


          `;
          let parametros=[id];
          client.query(sql,parametros,(err,data)=>{
          if(err){console.log(err);return;}
          done();
          return callback(null,data.rows);

          })

        })
}


static CargarOpcionesCompletadosxUsuario(id,callback){
   pool.connect((err,client,done)=>{
          let sql=`
          select u.nom_usu,t.id_trans,t.fecha_trans,o.mont_opc,o.mont_opc/10::float ganancia , ti.nom_tipo,u.foto_usu,u.estre_usu,u.id_usu
          from transacciones t
          inner join opciones o
          on o.id_opc=t.id_opc
          inner join propuestas p
          on p.id_propu=t.id_propu
          inner join usuarios u
          on u.id_usu=p.id_usu
          inner join tipos ti
          on ti.id_tipo=o.id_tipo
          where o.id_usu=$1

          `;
          let parametros=[id];
          client.query(sql,parametros,(err,data)=>{
          if(err){console.log(err);return;}
         done();
          return callback(null,data.rows);

          })

        })
}


static mostraropciones(object,callback) {
       


       pool.connect((err,client,done)=>{
        
         var sql = "select us.nom_usu ,us.estre_usu,op.mont_opc,"+
                  " cast((to_date(op.fecha_opc,'YYYY-MM-DD') + 1)"+
                  " as text) as fecha_opc,op.id_opc,us.foto_usu ,"+
                  "to_char( op.fecha_opc::timestamp,'HH24:MI:SS') as horafija,"+
                  " to_char(interval '24 hour' - (now() at time zone 'UTC' - interval '5 hour' - op.fecha_opc::timestamp),'HH24:MI:SS') as hora"+
                  ",(select count(*) from transacciones as tra "+
                   "inner join opciones as p"+
                    " on tra.id_opc = p.id_opc"+
                    " inner join propuestas as pro"+
                    " on tra.id_propu = pro.id_propu"+ 
                    " where pro.id_usu = us.id_usu or p.id_usu = us.id_usu) as tranfe_count"+
                  " from opciones as op"+
                    " inner join usuarios as us"+
                    " on op.id_usu = us.id_usu"+
                    " where estado_opc = 'A' and"+
                    " interval '24 hour' - (now() at time zone 'UTC' - interval '5 hour' - op.fecha_opc::timestamp ) > interval '-00:00:00'";
           
           if(object.id != null){
                sql += " and not (op.id_usu = "+ object.id +") and not (op.id_opc in (select id_opc from propuestas where id_usu = "+object.id+"))";
           } 


           if(object.opc != null){
                 
                 var pro = ((object.opc / 100)*10);

                sql += " and (op.mont_opc - (op.mont_opc * 0.1)) between "+(parseInt(object.opc) - pro)+" and "+ (pro + parseInt(object.opc)) ;
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
                          return callback([{num_cuenta : 'NO HAY NINGUN ',nom_banco:'NUMERO DE CUENTA'}]);
                     }
                     done();
                           
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

                       let query = "insert into propuestas(id_usu,id_cuenta,id_opc)"+
                                   " values ($1,$2,$3) returning id_propu";
                       
                       client.query(query,[json.id,data.rows[0].id_cuenta,parseInt(json.cod)],(err,data)=>{                  

                                          let query = `select id_usu from opciones where id_opc = `+ json.cod;

                                          var cod_pro = data.rows[0].id_propu;
                                   
                                          client.query(query,[],(err,data2)=>{

                                               done();

                                                var usu_opc = data2.rows[0].id_usu;

                                                var noti = require('./notficaciones.js');

                                                noti.realizarPropuesta(json,cod_pro,usu_opc);
 
                                              

                                          });


                              return callback("Acción Completada")

                       });

                    });

              }
              else{
                 return ;
              }

          });

       });

 }



 static MostrarEstadoRecibo(ideusu,x,callback){
    pool.connect((err,client,done)=>{
      let sql=`select *,
      to_char(interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - opc.fecha_opc::timestamp),'HH24:MI:SS') as hora
      , case
      when '24 hour' -(now() at time zone 'UTC' - interval '5 hour' - opc.fecha_opc::timestamp) > -interval '-00:00:00' then 'NV'
      else 'V'
      end as Vencio from 
      opciones as opc 
      where opc.id_opc=$1 and opc.id_usu=$2 `;
      client.query(sql,[x,ideusu],(err,data)=>{
       done();
        if(err){console.log(err);return;}

        return callback(null,data.rows)
      })
    })
 }


static actualisarDatos(j,callback){
  console.log(j);
  
  pool.connect(function(err,client,done){
    let consulta=`update usuarios
    set nom_usu=$1,ape_usu=$2,cel_usu=$3,correo_usu=$4,dni_usu=$5
    where id_usu=$6
    `;
    let aa=`
      
    `;
    let a=[j.nombre,j.apellidos,j.celu,j.correo,j.dni,j.ide];
    client.query(consulta,a,(err,data)=>{
      done();
      if(err){console.log(e);return callback(e,null);}
      return callback(null,data);
    });
  
  })
}

/*listar los postulantes para el paso 2 de un recibo*/
static ObtenerPostulantesDeUnRecibo(x,callback){
    pool.connect((err,client,done)=>{
          let sql=`
          select p.id_propu, u.id_usu,u.nom_usu ,u.ape_usu,u.foto_usu,estre_usu ,
          (select count(*) from  transacciones t
          inner join opciones o
          on o.id_opc=t.id_opc
          inner join propuestas p
          on p.id_propu=t.id_propu
          where p.id_usu=u.id_usu or o.id_usu=u.id_usu
          ) as Transacciones -- obtenemos las transacciones de los usuarios que estan propuestos en el recibo
          from propuestas p
          inner join opciones o
          on p.id_opc=o.id_opc
          inner join usuarios u 
          on p.id_usu=u.id_usu
          where p.id_opc=$1

          `;
          let parametros=[x];
          client.query(sql,parametros,(err,data)=>{
          if(err){console.log(err);return;}
          done();
          return callback(null,data.rows);

          })

        })
}


/* actulisa paso 2 a paso 3 de un recibo x=idusu, d=id_opc*/

static ActualisarPaso2A3Recibos(x,d,p,callback){
/*
 x->id usuario de la propuesta
 d  ->id de la opcion
 p ->id de la propuesta que fue eligido
*/
  pool.connect((err,client,done)=>{
   
   
   let query1=`
    update opciones set estadopaso_opc=3
    where id_opc=$1;
   `;
   client.query(query1,[d],(e,d)=>{
    if(e){console.log(e);return callback(e,null);}
     done();
     console.log(d);
     
   })

   let query=`insert into paso3Recibos(id_usu,id_opc,id_propu) values($1,$2,$3) returning id_p3r`;
   client.query(query,[x,d,p],(err,data)=>{
    done();
   if(err){console.log(err);return callback(err,null);}  
      return callback(null,data.rows[0].id_p3r);   
   });


  })

}

static MostrarDatosPaso3XRecibo(x,callback){
  pool.connect((err,client,done)=>{
    let query=`
    select u.nom_usu, p3.estado_p3r,p3.id_p3r,o.mont_opc,p3.fechac_p3r,numope_p3r,
    to_char(interval '2 hour' - (now() at time zone 'UTC' -interval '5 hour'-p3.fecha_p3r::timestamp),'HH24:MI:SS') as hora,
    case 
    when '2 hour' -(now() at time zone 'UTC' -interval '5 hour' - p3.fecha_p3r::timestamp ) > - interval '-00:00:00' then 'NV'
    else 'V' --vencio 
    end as vencio
    from paso3Recibos p3
    inner join opciones o
    on o.id_opc=p3.id_opc
    inner join usuarios u
    on u.id_usu=p3.id_usu
    where p3.id_opc=$1
    `;/*en la columna vencio N o NV*/
   client.query(query,[x],(err,c)=>{
    done();
     if(err){console.log(err);return callback(err,false);}
       
       return callback(null,c.rows);

   })

  })
}

static ActualisarConfirmarDepositoRecibo(x,i,callback){
  pool.connect((err,client,done)=>{
    let query=`
     update paso3Recibos
  set numope_p3r=$1 ,estado_p3r='C',
  fechac_p3r=to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS')
  where id_p3r=$2
    `;
   client.query(query,[x,i],(err,c)=>{
    done();
     if(err){console.log(err);return callback(err,false);}
       
       return callback(null,c.rows);

   })




  })
}

static ActualisarConfirmarVoucherPropuesta(x,i,callback){
  pool.connect((err,client,done)=>{
    let query=`
     update paso3Propuesta
  set foto_p3p=$1 ,estado_p3p='C',
  fechac_p3p=to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS')
  where id_p3p=$2
    `;
   client.query(query,[x,i],(err,c)=>{
    done();
     if(err){console.log(err);return callback(err,false);}
       
       return callback(null,c.rows);

   })




  })
}

 static MostrarEstadoPropuesta(x,ideusu,callback){
    pool.connect((err,client,done)=>{
      let sql=`select u.nom_usu,to_char('24 hour' - ( now() at time zone 'UTC' - interval '5 hour' - opc.fecha_opc::timestamp ),'HH24:MI:SS') as hora,opc.fecha_opc,
      to_char(opc.fecha_opc::timestamp  + '24 hour' ,'dd-mm-yyyy') || ' del ' || to_char(opc.fecha_opc::timestamp + '24 hour','HH:MI AM') as fecha
      , case
      when '24 hour' -(now() at time zone 'UTC' - interval '5 hour' - opc.fecha_opc::timestamp) > -interval '-00:00:00' then 'NV'
      else 'V'
      end as Vencio, p.estado_paso_propu,p.estado_propu from 
      propuestas p
      inner join opciones as opc 
      on p.id_opc=opc.id_opc
      inner join usuarios as u
      on u.id_usu=opc.id_usu     
      where p.id_propu=$1 and p.id_usu=$2 `;
      client.query(sql,[x,ideusu],(err,data)=>{
        done();
        if(err){console.log(err);return;}
        return callback(null,data.rows)
      })
    })
 }


static CancelarRecibo(x,callback){
  pool.connect((err,client,done)=>{
    let query=`
     update opciones
  set estado_opc='I'
  where id_opc=$1
    `;
   client.query(query,[x],(err,c)=>{
    done();
     if(err){console.log(err);return callback(err,false);}
       
       return callback(null,c.rowCount);

   })




  })
}


static MostrarDatosPaso3XPropuesta(x,u,callback){
  pool.connect((err,client,done)=>{
    let query=`
   select u.nom_usu,t.nom_tipo,t.tipo_tipo,o.codsum_opc,
p.estado_propu,p.acadmin_propu,
o.mont_opc as monto,p3.*
from propuestas p
inner join opciones o
on o.id_opc=p.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
inner join usuarios u
on u.id_usu=o.id_usu
left join paso3Propuesta p3
on p.id_propu=p3.id_propu
where p.id_propu=$1 and p.id_usu=$2

    `;/*en la columna vencio N o NV*/
   client.query(query,[x,u],(err,c)=>{
    done();
     if(err){console.log(err);return callback(err,false);}
       
       return callback(null,c.rows);

   })

  })
}



 static consultarNotificaciones(id,callback){
    
     pool.connect((err,client,done)=>{

          console.log(id);

            let query = "select "+ 
                      "n.id_tn,n.fecha_not,"+
                      "(to_char(timezone('UTC'::text, now()) - '05:00:00'::interval,'YYYY-MM-DD HH24:MI:SS')::time - n.fecha_not::time) as hora,"+
                      "(to_char(timezone('UTC'::text, now()) - '05:00:00'::interval,'YYYY-MM-DD HH24:MI:SS')::date - n.fecha_not::date) as dias,"+
                      "o.id_opc,o.mont_opc,ti.tipo_tipo,ti.tipo_tipo,ti.nom_tipo,o.fecha_opc,o.codsum_opc,"+
                      "p.id_propu,c.num_cuenta,b.nom_banco,p.fecha_propu,"+
                      "t.id_trans,t.fecha_trans,"+
                      "uo.id_usu as idusuopc ,uo.nom_usu as nomusuopc ,uo.estre_usu as estreusuopc,"+
                      "up.id_usu as idusupro ,up.nom_usu as nomusupro ,up.estre_usu as estreusupro "+
                      "from notificaciones as n "+
                      "left join opciones as o "+
                      "on n.id_opc = o.id_opc "+
                      "left join propuestas as p "+
                      "on n.id_opc = p.id_opc "+
                      "left join transacciones as t "+
                      "on n.id_trans = t.id_trans "+
                      "left join usuarios as uo "+
                      "on o.id_usu = uo.id_usu "+
                      "left join usuarios as up "+
                      "on p.id_usu = up.id_usu "+
                      "left join cuentas as c "+
                      "on p.id_cuenta = c.id_cuenta "+ 
                      "left join bancos as b "+
                      "on c.id_banco = b.id_banco "+
                      "left join tipos as ti "+
                      "on o.id_tipo = ti.id_tipo "+
                      "where n.id_usu = $1 "+
                      "order by fecha_not desc";
              
                console.log(query);

              client.query(query,[id],(err,dato)=>{
                   
                    done();

                    console.log(err)
                      return callback(dato.rows);

                });

           });

 }


static ValidarPublicarReciboSiTieneMisDatos(x,callback){
  pool.connect((err,client,done)=>{
    let query=`
       select * from usuarios where 
       id_usu =$1 and dni_usu is null and cel_usu is null and correo_usu is null;

    `;
    client.query(query,[x],(e,d)=>{
      done();
     if(e){console.log(e);}
     return callback(null,d.rows);
    })
  })
}


static ActualisarNotificacionXUsuario(x){
  pool.connect((err,client,done)=>{
    let query=`
     update notificaciones 
set est_not='V'
where id_usu=$1;

    `;
   client.query(query,[x],(err,c)=>{
    done();
     if(err){console.log(err);return callback(err,false);}
       
   })




  })
}

}

module.exports=Operaciones; 