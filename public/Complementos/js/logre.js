



document.getElementsByName('enviar').onclick=function(){
	var data={
     'nombre':nameObject('nom'),
     'correo':nameObject('correo'),
     ''
	}
	$.ajax({
		url:'/register',
		type:'POST',
		data:{data:JSON.stringify(data)},
		success:function(data){

		}
	})
}

function nameObject(x){
	return document.getElementsByName(x)[0]
}