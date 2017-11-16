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
          4
		},1000);



// aqui para los formatos de fechas

var fech=document.getElementsByClassName("fechaOA");

for(let i=0;fech.length>i;i++){
  let f=fech[i].dataset.fechaoa;
  let dia=moment(f,'YYYY-MM-DD HH:mm:ss A').format('DD');;
    let mes=moment(f).format('MMMM');;
    let año=moment(f,'YYYY-MM-DD HH:mm:ss A').format('YYYY');;
    let horas=moment(f,'YYYY-MM-DD HH:mm:ss A').format('hh:mm a');;
    fech[i].innerText=`Cerró el ${dia} de ${mes} a las ${horas} del ${año}`;

}