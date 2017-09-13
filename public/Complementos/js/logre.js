



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
document.getElementsByName('login')[0].addEventListener('click',function(){
	var data={
		"correo":document.getElementsByName("correolog")[0].value,
		"password":document.getElementsByName("contralog")[0].value
	}
	$.ajax({
		url:"/login",
		type:"POST",
		data:data,
		success:function(e){
			if(e.err){
			document.getElementsByName('errIngreso')[0].innerText=e.msj;	
			document.getElementsByName('errIngreso')[0].style.color='red';
			return;
			}

			location.reload();
		}
	})
})

function nameObject(x){
	return document.getElementsByName(x)[0].value;
}

function err(){
	return document.getElementsByClassName('aviso').item(0);
}