var pg= require('pg');

var config={
    host:'localhost',
    user:'postgres',
    database:'japanaja',
    password:'javierreyes',
    port:'5432'
}

var pool=new pg.Pool(config);

class Logeo {

    static registrar(user,callback){

        pool.connect((err,client,done)=>{

           var sql=`insert into usuarios (nom_usu,id_face_usu,foto_usu,estre_usu)
            values ($1,$2,$3,0)`;

            var photo = "http://graph.facebook.com/"+user.id+"/picture";
            client.query(sql,[user.name,user.id,photo],(err,date)=>{
             
                done();
          
                    pool.connect((err,client,done)=>{

                    client.query("select * from usuarios where id_face_usu = $1",[user.id],function(err,data){
                        done();
                        if(err){return callback(true)}
                        return callback(data.rows[0]);
                        })
                        
                    });   

            });
            
        })

    }



}

module.exports=Logeo;