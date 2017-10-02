var pg=require('pg');
const config={
	host:'localhost',
	user:'postgres',
	database:'japanaja',
	port:'5432',
	password:'andy'
}
var pool=new pg.Pool(config);

class Operaciones {

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
 		          values($1,$2,$3,$4,$5)`;
 		let parametros=[id,i.monto,'45646645',i.tipo,i.codsum];
 		
 		client.query(sql,parametros,(err,client)=>{
 			
 			if(err){console.log(err);
        callback(err);return;};
 			callback(null);
 		})  

     let sql1=`
        
     `;
     let parametros1=[];
     client.query(sql1,parametros1,(err,data)=>{
      if(err){console.log(err);return;}
      console.log(data);
      done();
     });
     

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
         u.id_usu,u.nom_usu,u.ape_usu,b.nom_banco  ,p.id_propu,o.fecha_opc,o.codsum_opc,t.nom_tipo,o.mont_opc,p.mont_propu
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

          return callback(null,data.rows);

          })

        })
    }

static CargarPropuestasCompletadosxUsuario(id,callback){
   pool.connect((err,client,done)=>{
          let sql=`
           
--sacar propuesta realisadasi
select u.nom_usu,u.foto_usu,u.estre_usu ,ti.nom_tipo,o.mont_opc,p.mont_propu,t.id_trans,t.fecha_trans,o.mont_opc - p.mont_propu ahorrado
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

          return callback(null,data.rows);

          })

        })
}



}

module.exports=Operaciones;