var pg= require('pg');

var config=require("./../configBD.json");

var pool=new pg.Pool(config);

class Logeo {

    static  LogIn(user,comtra,callback){
        console.log(user,comtra);
        pool.connect((err,client,done)=>{
         client.query("select * from usuarios where correo_usu=$1 and contra_usu=$2",[user,comtra],function(err,data){
            done();
            console.log(data);
           if(err){return callback(err,'')}

           return callback(null,data.rows);

         })
         
        });   
    }

    static registrar(i,callback){
    pool.connect((err,client,done)=>{
        var sql=`insert into usuarios(dni_usu,nom_usu,ape_usu,contra_usu,cel_usu,correo_usu) 
        values($1,$2,$3,$4,$5,$6)`;
        client.query(sql,[i.dni,i.nombre,i.apellidos,i.comtra,i.celular,i.correo],(err,data)=>{
             done();
             if(err){console.log(err.error,err.detail);
                return callback(err,null);}
            return callback(null,data);
        });
    })
    }



}

module.exports=Logeo;