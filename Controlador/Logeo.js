var BD=require('./../Modelo/Logeo.js');

class Logeo{

static login(req,res){
var user= req.body.correo;
var comtra=req.body.password;

        BD.LogIn(user,comtra,function(err,data){
                if(err){
                    return console.log(err);
                }
        });

}

static registrar(req,res){
    var cliente=JSON.parse(req.body.data);
    BD.registrar(cliente,(err,data)=>{
    	
    })
}


}

module.exports=Logeo;