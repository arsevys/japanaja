
var notificacion = require('./notficaciones.js');

var pg=require("pg");
let config=require("./../configBD.json");

var pool= new pg.Pool(config);
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});
class OperacionesAdministrador {

	static ConfirmarDepositoRecibo(x,i,callback){
    /*
    x->id de opciones
    i->id Propuestas
    */

     pool.connect((err,client,done)=>{
      let query= `
       update opciones 
       set acadmin_opc='C'
       where id_opc=$1
      `;
      let query1=`
       update propuestas
       set estado_paso_propu=3
       where id_propu=$1
      `;
      let query2=`
      insert into paso3Propuesta(id_opc,id_propu) values($1,$2)
      `;

      client.query(query,[x],(err,data)=>{
      if(err){console.log(err);return;}
      })
      client.query(query1,[i],(err,data)=>{
      if(err){console.log(err);return;}
       callback(null,data.rows);

      })
      client.query(query2,[x,i],(err,data)=>{
        done();
      if(err){console.log(err);return;}
      })

     })
	}

 static ComfirmarVoucherGenerarTransaccion(x,i,callback){
  /*
  x->id de propuesta
  i->id de opcion
  */
  pool.connect((err,client,done)=>{
    let query=`
     insert into transacciones(id_trans,id_propu,id_opc) values('123',$1,$2)
    `;
    let query1=`update opciones set estado_opc='R' where id_opc=$1`;
    let query2=`update propuestas set estado_propu='R' where id_propu=$1`;
   client.query(query,[x,i],(err,c)=>{
     if(err){console.log(err);return callback(err,false);}
       
      callback(null,c.rows);

   })
   client.query(query1,[i],(err,c)=>{
     if(err){console.log(err);return callback(err,false);}

   })
   client.query(query2,[x],(err,c)=>{
     if(err){console.log(err);return callback(err,false);}
    done();
   })

  })
}

}
module.exports=OperacionesAdministrador;