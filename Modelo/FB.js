var pg= require('pg');

var config=require("./../configBD.json");

var pool = new pg.Pool(config);

class Logeo {

    static registrar(user,callback){

         console.log(user);

        pool.connect((err,client,done)=>{

            var sql=`insert into usuarios (nom_usu,id_face_usu,foto_usu)
            values ($1,$2,$3)`;

            var photo = "http://graph.facebook.com/"+user.id+"/picture";

            client.query(sql,[user.name,user.id,photo],(err,data)=>{
                
                
                    client.query("select * from usuarios where id_face_usu = $1",[user.id],function(err2,data2){
                          
                          done();

                         if(err2){
                            return callback(true)
                         }

                         callback(data2.rows[0]);

                   })
             });

        })

    }



}

module.exports=Logeo;