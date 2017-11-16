
var aux = "";
var ide ;
 
 window.onload = ()=>{
  
      inic();


 }
 
 function inic(){
    var botton = document.querySelectorAll(".easycash .col-sm-3 form fieldset input[type='button']");
    
      for (var i = 0; i < botton.length ; i++) {

           botton.item(i).name = i;
        
           botton.item(i).addEventListener("click", function(event){
               propuesta(event.target.getAttribute('name'));
           },false);

      }

 }

 var id ;

 function propuesta(x){

   var modal = document.querySelector("#ModalPropuesta div .modal-content");

   var option = document.querySelectorAll(".proposals").item(x);
   
   var msj = document.querySelector("#ModalConfirmacion .modal-dialog .modal-content .modal-body p");

   id = option.dataset.code;
   
   var fecha = option.dataset.fec;
 

   var hora = option.dataset.hora.split(":");
   var entero = parseInt(hora[0]);
   var tm = "am";
   if(parseInt(hora[0]) > 12) {
        tm = "pm";
          entero = entero - 12;
   }

   hora = entero +":"+hora[1]+":"+hora[2]+" "+tm;


   msj.innerText = "Recibirás una notificación en caso "+option.dataset.name+" acepte tu propuesta, a mas tardar el "+fecha+" a las " + hora;
   modal.querySelector(".modal-header h4").innerText = "Haz tu propuesta a " + option.dataset.name;
   modal.querySelector(".modal-body form div div .bold").innerText = option.querySelector("div .verde").innerText;
    modal.querySelector(".modal-body form div div .verde").innerHTML = option.querySelector("div .bold").innerText;
    ide = option.dataset.code;
 }




var entrada = true ;

window.onscroll = (xe)=>{
 
    window.document.body.onscroll = (e)=>{

            var scl = e.target.scrollingElement.scrollTop ;
      
         if((e.target.scrollingElement.offsetHeight - 200 ) < (scl + e.target.scrollingElement.clientHeight) && entrada){
           
              entrada = false ;

              masopciones ()

         }


         if((e.target.scrollingElement.offsetHeight - 200 ) > (scl + e.target.scrollingElement.clientHeight) && !entrada){
           
            entrada = true ;


         }
 


  }
}



class objeto {
   
   constructor(objeto){
      this.obj = document.createElement(objeto);
   }
   
   addClass(clases){
       for (var i = 0; i < clases.length; i++) {
          this.obj.classList.add(clases[i]);
       }
   }

   addAttr(attr){
        for (var i = 0; i < attr.length; i++) {
          var at = document.createAttribute(attr[i].attr);
          at.value = attr[i].val;
          this.obj.setAttributeNode(at);
       }
   }

   addChild(ob){
     this.obj.appendChild(ob);
   }

   addbefore(ob,child){
    this.obj.insertBefore(ob,child);
   }

   addText(text){
      this.addChild(document.createTextNode(text));
   }

   returnobj(){
    return this.obj;
   }

}

var index = 4 ;
var estado = 200 ;


function masopciones (){
  
  if(estado == 200){
    $.ajax({
     url:'/masopciones',
     type:'GET',
     data:{
          index : index
     },
     success:function(data){

          estado = data.state;
          var date = data.lista;
         
          console.log(date);
        
          date.forEach((x)=>{


            var attr = [
            {
              attr:"data-recom",
              val:(x.mont_opc-((x.mont_opc/100)*10)).toFixed(2)
            },
            {
              attr:"data-name",
              val:x.nom_usu,
            },
            {
              attr:"data-fec",
              val:x.fecha_opc,
            },
            {
              attr:"data-hora",
              val:x.horafija,
            },
            {
              attr:"data-code",
              val:x.id_opc,
            }];

            var element = new objeto('section');
            element.addClass(["proposals","row","nopad","easycash"])
            element.addAttr(attr);

           var text = `<div class="col-sm-3">
                           <h2>Recibe</h2>
                           <p class="monto bold">S/ `+(x.mont_opc - ((x.mont_opc/100)*10)).toFixed(2)+`</p>
                           <p class="cierre">En tu cuenta de banco</p>
                        </div>
                        <div class="col-sm-3">
                            <h2>Pagando un recibo de Enel por:</h2>
                            <p class="monto verde">S/ `+x.mont_opc+`</p>
                            <p class="cierre">Con tu tarjeta de crédito</p>
                        </div>
                        <div class="col-sm-3">
                            <h2>El dueño del recibo es: </h2>
                            <figure>
                                <img src="`+x.foto_usu+`" alt="">
                            </figure>
                            <h3>`+x.nom_usu+`</h3>
                            <div class="rating">`;
                                          if(x.estre_usu == 100){
                                              text += ` <a class="good">1</a>
                                                <a class="good">2</a>
                                                <a class="good">3</a>
                                                <a class="good">4</a>
                                                <a class="good">5</a>`
                                            }else if (x.estre_usu >= 80){
                                               text +=`<a class="good">1</a>
                                                <a class="good">2</a>
                                                <a class="good">3</a>
                                                <a class="good">4</a>
                                                <a >5</a>`
                                            }else if (x.estre_usu >= 60){
                                              text +=  `<a class="good">1</a>
                                                <a class="good">2</a>
                                                <a class="good">3</a>
                                                <a >4</a>
                                                <a >5</a>`
                                            }else if (x.estre_usu >= 40){
                                              text +=  `<a class="good">1</a>
                                                <a class="good">2</a>
                                                <a >3</a>
                                                <a >4</a>
                                                <a >5</a>`
                                            }else if (x.estre_usu >= 20){
                                               text += `<a class="good">1</a>
                                                <a >2</a>
                                                <a >3</a>
                                                <a >4</a>
                                                <a >5</a>`
                                            }else{
                                              text +=  `<a >1</a>
                                                <a >2</a>
                                                <a >3</a>
                                                <a >4</a>
                                                <a >5</a>`
                                            }
                                        
                   text += ` </div>
                            <p class="cierre blue">`+ x.tranfe_count +` transacciones</p>
                        </div>
                        <div class="col-sm-3">
                            <form>
                                <fieldset>
                                    <input type="button" class="btn azul" value="¡Quiero el efectivo!" data-toggle="modal" data-target="#ModalPropuesta">
                                </fieldset>
                            </form>
                        </div>`;

            element.obj.innerHTML = text;
             document.getElementById("Listado").appendChild(element.returnobj());

              inic();
          });

     }
    })
  }

}



function consultar(){  

                var num = document.getElementById("monto").value;

                if(num == ""){
                   window.location.href = '/filtros?num=' + num 
                }
                else if (!/^[0-9]{0,3}[.]{0,1}[0-9]{0,3}$/.test(num)){
                    document.querySelector("#ModalAlerta .modal-header h4").innerText = "Monto no valido";
                    document.querySelector("#ModalAlerta .modal-body p").innerText = "Ingrese un monto valido";
                    document.getElementById("active").click();    
                    document.getElementById("monto").value ="";
                }
                else if (parseFloat(num) > 500) {
                    document.querySelector("#ModalAlerta .modal-header h4").innerText = "Monto muy elevado";
                    document.querySelector("#ModalAlerta .modal-body p").innerHTML = "Recuerde que lo maximo que puede solicitar <br> son 500 Nuevos Soles";
                    document.getElementById("active").click();
                }
                else {
                    window.location.href = '/filtros?num=' + num 
                }
}

function onpress(event){

  if(event.which== 13)
      consultar();
}

function lanzarpropuesta(){
   
  var opction = document.getElementById("cuentas").selectedIndex ;
   
       $.ajax({
         url:'/registrarPropuesta',
         type:'GET',
         data:{
              index : id,
              opc:opction
         },success:function(data){
                console.log(data);
                if(data == "Acción Completada"){
                     document.getElementById("cierre").click();
                     document.getElementById("activemodal").click();
                     setTimeout(()=>{
                             location.reload();
                     },200);
                }
                else if(data == "Inicie Seccion Porfavor !!"){
                    document.getElementById("cierre").click();
                    document.querySelector("#ModalRespuesta .modal-header h4").innerText = "Inicie session";
                    document.querySelector("#ModalRespuesta .modal-body p").innerHTML = data;
                     document.getElementById("activerespuesta").click();
                }
                else if(data == "No se completo la acción"){
                    document.getElementById("cierre").click();
                    document.querySelector("#ModalRespuesta .modal-header h4").innerText = "Error en la solicitud";
                    document.querySelector("#ModalRespuesta .modal-body p").innerHTML = data;
                     document.getElementById("activerespuesta").click();
                }
         }
         });
   

}


