
function mantenimiento(){
	
	let dato ={
      "nombre":$(".nomdp").val(),
      "apellidos":$(".apedp").val(),
      "correo":$(".correodp").val(),
      "dni":$(".dnidp").val(),
      "celu":$(".celdp").val(),
      "banco":$("#tipoBanco").val(),
	  "cuenta":$("#ncuen").val(),
	  "interbancario":$("#codIn").val(),
	  "nuan":$(".cuenta").data("es")==""?'N':'A'
	}

	

	$.ajax({
		url:"/GuardarDatos",
		type:"POST",
		data:dato,
		success:function(e){
			if(e.err){
           $(".result"),text(e.data);
         console.log(e);
			}
		}
	});
    



}

$("#tipoBanco").change(function(a){
console.log(a.target.value);
});

function validar(){
	
}