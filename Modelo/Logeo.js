var pg= require('pg');

var config={
    host:'localhost',
    user:'postgres',
    database:'japanaja',
    password:'andy',
    port:'5432'
}

var pool=new pg.Pool(config);

class Logeo {

    static  LogIn(user,comtra,callback){
        pool.conect((err,client,done)=>{
         client.query("select * from usuarios correo_usu=? and comtra_usu=?",[user,comtra],function(err,data){
            done();
           if(err){return callback(err,'')}

           return callback(null,data.rows);

         })
         
        });   
    }

    static registrar(i,callback){
    pool.conect((err,client,done)=>{
        const sql=`insert into usuarios 
        values(?,?,?,?)`;
        client.query(sql,[i.dni,i.nombre,i.apellidos,i.comtra,i.celular,i.correo],(err,data)=>{
            done();
            if(err){return callback(err,null);}
            return callback(null,data.rows);
        });
    })
    }



}

module.exports=Logeo;