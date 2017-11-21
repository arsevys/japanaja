
document.getElementsByName('monto')[0].addEventListener('mouseout',()=>{

 let num=parseFloat(document.getElementsByName('monto')[0].value);
        if(document.getElementsByName('monto')[0].value==""){
          return;
        }
        if(isNaN(num)){
          console.log("corregir numero");

        document.getElementsByClassName('errPO')[0].innerText="Usted a insertado un precio no valido";
        document.getElementsByClassName('errPO')[0].style.color="red";
        document.getElementsByName('monto')[0].value="";
        document.getElementsByName('monto')[0].focus;
            return;
        }
        if(num>500.00){
        document.getElementsByClassName('errPO')[0].innerText="El Precio limite es 500";
        document.getElementsByClassName('errPO')[0].style.color="red";
        document.getElementsByName('monto')[0].focus;

        return;
        }

      console.log(parseFloat(document.getElementsByName('monto')[0].value));
      document.getElementsByName('monto')[0].value=parseFloat(document.getElementsByName('monto')[0].value).toFixed(2);

      document.getElementsByClassName('errPO')[0].innerText="";

});

document.getElementsByClassName('PO')[0].addEventListener('click',()=>
{enviarOpcion()});

function enviarOpcion(){

  
 let num=parseFloat(document.getElementsByName('monto')[0].value);
     if(num>500.00){
        document.getElementsByClassName('errPO')[0].innerText="El Precio limite es 500";
        document.getElementsByClassName('errPO')[0].style.color="red";
        document.getElementsByName('monto')[0].focus;

        return;
        }
	let data={
		'tipo':parseInt(document.getElementById('tipos').value),
         'monto':parseFloat(document.getElementsByName('monto')[0].value),
         'codsum':document.getElementsByName('codsum')[0].value
	}
	$.ajax({
		'url':'/PublicarAhorro',
		'type':'POST',
		 'data':{datos:JSON.stringify(data)},
		'success':function(data){
      if(data.datos){
         location.href ="/MisDatos";
        return;
      }
          if(data.err){
          	document.getElementsByClassName('errPO')[0].innerText=data.msj;
          	document.getElementsByClassName('errPO')[0].style.color="red";
          	return;
          }
          document.getElementsByClassName('errPO')[0].innerText=data.msj;
          	document.getElementsByClassName('errPO')[0].style.color="green";
           setTimeout(function(){
            document.getElementsByClassName('closeM')[0].click();
           },1000);

		}
	})
}

function limpiar (){
          document.getElementsByClassName('errPO')[0].innerText="";
          document.getElementsByName('monto')[0].value="";
          document.getElementsByName('codsum')[0].value="";
}