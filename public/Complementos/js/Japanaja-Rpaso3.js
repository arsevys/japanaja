
 var pre=null;
 var id=null;
 var ido=null;
 var o=$(".confDeposito").data("p");
$(".btnPropu").click(function(){
	console.log(this.dataset);

	pre=this.dataset.pre;
	id=this.dataset.id;
	ido=this.dataset.ido;
	$("#PreP").text(pre);
	console.log(pre,id);


})

$(".confDeposito").click(function(){
let d=/^\S{4,89}$/;
let x=$(".txtDeposito").val();
if(!d.test(x)){

return;
}

$.ajax({
  url:"/ConfirmarDeposito",
  type:"POST",
  data:{"txtD":x,"p3":o},
  success:function(e){
    if(e.err){
      $(".notiD").text(e.mensaje);
    return;
    }
    $(".ho").click();
     setInterval(function(){location.reload(true);},3500);
  }
})






})

function confirmar(){
	location.reload(true);

}


   var temporizador=setInterval(()=>{
          var horas=document.getElementsByClassName('horaDescuento');
           console.log(horas[0].dataset.ht);
           for(let i=0;horas.length>i;i++){
           let obtenerHora =horas[i].dataset.ht;
           let parsearHora=obtenerHora.split(":");
           let hora=parsearHora[0];
           let minutos=parsearHora[1];
           let segundos=parseInt(parsearHora[2]);

           if(segundos>0){
           segundos=segundos-1;
           segundos=(segundos<10)?'0'+segundos:segundos;
           horas[i].innerText=`${hora}:${minutos}:${segundos}`;
           horas[i].dataset.ht=`${hora}:${minutos}:${segundos}`;
           continue;
           }

           else if(segundos<=0){
                if(minutos==0){
                    if(hora==0){
                        horas[i].innerText="Se Termino el tiempo";
                        continue;
                    }
                
                hora=hora-1;
                hora=(hora<10)?'0'+hora:hora;
                segundos=(segundos<10)?'0'+segundos:segundos;            
               horas[i].innerText=`${hora}:${59}:${59}`;
               horas[i].dataset.ht=`${hora}:${59}:${59}`;
                continue;
                }

                 minutos=minutos-1;
                 segundos=(segundos<10)?'0'+segundos:segundos;
                 minutos=(minutos<10)?'0'+minutos:minutos;            
               horas[i].innerText=`${hora}:${minutos}:${59}`;
               horas[i].dataset.ht=`${hora}:${minutos}:${59}`;
               continue;
           }
           }
          
        },1000);