var pg=require('pg');
const config={
	host:'localhost',
	user:'postgres',
	database:'japanaja',
	port:'5432',
	password:'andy'
}
var pool=new pg.Pool(config);


class Correo {

static CargarDatosUsuario(x,callback){
 pool.connect(function(err,client,done){
         let query=`
    select u.correo_usu ,(select nom_usu from usuarios where id_usu=o.id_usu) as nombre,
	o.mont_opc,t.nom_tipo
	from 
	paso3Recibos as p3 
	inner join usuarios u
	on u.id_usu=p3.id_usu
	inner join opciones o
	on o.id_opc=p3.id_opc
	inner join tipos t
	on t.id_tipo=o.id_tipo
	where p3.id_p3r=$1



         `;
      client.query(query,[x],(err,data)=>{
       if(err){console.log(err);return;}
       done();
       return callback(null,data.rows);
      });
 });

}

static CargarDatosConfirmacionRecibo(x,callback){
	 pool.connect(function(err,client,done){
         let query=`
    
select p3.id_propu, o.id_opc, o.mont_opc,u.nom_usu,u.ape_usu ,p3.numope_p3r as numope,
o.mont_opc-(o.mont_opc * 0.025) as monto,t.nom_tipo
from 
paso3Recibos as p3 
inner join opciones o
on o.id_opc=p3.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
inner join usuarios u
on u.id_usu=o.id_usu
where p3.id_p3r=$1 and p3.estado_p3r='C'

         `;
      client.query(query,[x],(err,data)=>{
       if(err){console.log(err);return;}
       done();
       return callback(null,data.rows);
      });
 });
}

static CargarDatosVoucherPropuesta(x,callback){
	 pool.connect(function(err,client,done){
         let query=`
    
select p3p.id_propu, p3p.id_p3p,o.id_opc,u.nom_usu,o.mont_opc
,t.nom_tipo,t.tipo_tipo,p3p.foto_p3p,
(select us.nom_usu from usuarios us  
inner join propuestas pe on pe.id_usu=us.id_usu where pe.id_propu=p3p.id_propu) as nom
from paso3Propuesta p3p
inner join opciones o
on o.id_opc=p3p.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
inner join usuarios u
on u.id_usu=o.id_usu
where p3p.id_p3p=$1 or p3p.estado_p3p='C'
         `;
      client.query(query,[x],(err,data)=>{
       if(err){console.log(err);return;}
       done();
       return callback(null,data.rows[0]);
      });
 });
}

}


module.exports=Correo;