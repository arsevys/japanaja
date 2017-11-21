
function notifi(){
	$.ajax({
		url:"/Notificaciones",
		type:"POST",
		settings:{
			async:false
		},
		success:function(i){
           console.log(i);
			if(i>0){
				$(".alertas").html("<span class='sinleer alert'></span>");
			
			
			$(".alert").text(i);
		}
		 else if(i<=0){
			$(".alertas").html(i);}
		}
	})
}


setInterval(function(){
	console.log("Enviando....")
	notifi();
},1000)