var pg=require("pg");
let config=require("./../configBD.json");

var pool= new pg.Pool(config);

class Notificacion{

static Obtener(x,callback){
pool.connect((err,client,done)=>{
	if(err){};
	let q=`
    
select count(*) as contador from notificaciones n
where id_usu=$1 and est_not='N';
	`;
	client.query(q,[x],(e,d)=>{
		done();
      if(e){console.log(e);return callback(e,null);}
      return callback(null,d.rows[0]);
	})
})
}

}

module.exports=Notificacion;