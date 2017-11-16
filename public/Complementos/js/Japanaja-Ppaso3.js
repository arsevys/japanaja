function subir(x){

console.log(77);

var f=new FormData();
f.append("ya",$("input[name=foto]")[0].files[0]);
f.append("i",x);
$.ajax({
	url:"/SubirImg",
	type:"POST",
	data:f,
	contentType:false,
	processData:false,
	success:function(e){
	 if(e.err){
        alert("error");
	 	return;
	 }
setTimeout(function(){
	
	 location.reload(true);
},1500);
	}
})
}

$("input[name=foto]").change(function(e){
	console.log(e.target.files[0]);
	let i=e.target.files[0].name;
	$(".tf").val(i);
})