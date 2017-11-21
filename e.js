var pg=require('pg');
var config=require("./configBD.json");
var pool=new pg.Pool(config);
pool.connect((err,client,done)=>{
	
	done();
})