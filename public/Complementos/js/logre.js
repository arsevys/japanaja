



document.getElementsByName('enviar')[0].onclick=function(){
	var data={
     'nombre':nameObject('nom'),
     'correo':nameObject('correo'),
     'comtra':nameObject('comtra'),
     'apellidos':nameObject('ape'),
     'dni':nameObject('dni'),
     'celular':nameObject('cel')
	}

	$.ajax({
		url:'/register',
		type:'POST',
		data:{data:JSON.stringify(data)},
		success:function(data){
			console.log(data);
			data=JSON.parse(data);
       if(data.err){
       	err().innerText=data.errores;
       	err().style.color='red';
       }
       else {
       	err().innerText=data.errores;
       	err().style.color='green';
       	setTimeout(function(){location.reload();},300);
       }
		}
	})
}

function nameObject(x){
	return document.getElementsByName(x)[0].value;
}

function err(){
	return document.getElementsByClassName('aviso').item(0);
}