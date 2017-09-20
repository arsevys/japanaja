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
 static CargarTipos(callback)



}

module.exports=Operaciones;