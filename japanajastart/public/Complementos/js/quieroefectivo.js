
var aux = "";
var ide ;
 
 window.onload = ()=>{
  
      inic();


 }
 
 function inic(){
    var botton = document.querySelectorAll(".col-sm-6 form fieldset input[type='button']");
    
      for (var i = 0; i < botton.length ; i++) {

           botton.item(i).name = i;
        
           botton.item(i).addEventListener("click", function(event){
               propuesta(event.target.getAttribute('name'));
           },false);

           var text = document.querySelectorAll(".col-sm-6 form fieldset input[type='text']");

           text.item(i).addEventListener("keyup", function(event){
        
               var pre = this.value;

               if (/^[0-9]{1,}[.]{0,1}[0-9]{0,}$/.test(pre)) {
                  return;
               }
               else {

                this.value = aux;
               }

           },false);

      }

       var modaltext = document.querySelector(".modal-body form .tu-propuesta .col-sm-5 input[type='text']");

         modaltext.addEventListener("keyup", function(event){
      
             var pre = this.value;

             if (/^[0-9]{1,}[.]{0,1}[0-9]{0,}$/.test(pre)) {
                return;
             }
             else {

              this.value = aux;

             }

         },false);
 }

 var id ;

 function propuesta(x){

   var modal = document.querySelector("#ModalOpcion div .modal-content");
   console.log(modal);
   var option = document.querySelectorAll(".proposals").item(x);
   
   id = option.dataset.code;
   modal.querySelector(".modal-body form div div div figure img").src = option.querySelector("div div div div figure img").src;
   modal.querySelector(".modal-body form div div div .rating").innerHTML = option.querySelector("div div div div .rating").innerHTML;
    modal.querySelector(".modal-body form div div div .monto").innerHTML = option.querySelector("div div div div .monto").innerHTML;
     modal.querySelector(".modal-body form div div div .small").innerHTML = option.dataset.time;
    modal.querySelector(".modal-body form .tu-propuesta div input[type='text']").value = option.querySelector("div div div .col-sm-6 form fieldset input[type='text']").value;
     modal.querySelector(".modal-body form .tu-propuesta div input[type='text']").placeholder = "S/ "+option.dataset.recom;
      ide = option.dataset.code;
 }



function proponer(){

   

}

var entrada = true ;

window.onscroll = (e)=>{

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
              attr:"data-time",
              val:x.hora
            },
            {
              attr:"data-recom",
              val:(x.mont_opc-((x.mont_opc/100)*10)).toFixed(2)
            }];

            var element = new objeto('section');
            element.addClass(["proposals"])
            element.addAttr(attr);

      
             var el = new objeto("div");
             el.addClass(["row","nopad"]);

                     var elc = new objeto("div");
                     elc.addClass(["col-sm-7","white-card"]); 
                               
                               var elch =new objeto("div");
                                 elch.addClass(["row","nopad"]);;

                                   var elchi = new objeto("div");
                                       elchi.addClass(["col-sm-4"]);
                                   var elchi2 = new objeto("div");
                                       elchi2.addClass(["col-sm-4"]);
                                   var elchi3 =new objeto("div");
                                       elchi3.addClass(["col-sm-4"]);

                                     var h2 = new objeto("h2");
                                         h2.addText("Para pagar con tarjeta de crédito");
                                     var p = new objeto("p");
                                         p.addClass(["monto","verde"]);
                                         p.addText("S/" + x.mont_opc);

                                     elchi.addChild(h2.returnobj());
                                     elchi.addChild(p.returnobj());

                                         h2 = new objeto("h2");
                                         h2.addText("Vencimiento");
                                         p = new objeto("p");
                                         p.addText(x.fecha_opc);

                                     elchi2.addChild(h2.returnobj());
                                     elchi2.addChild(p.returnobj());

                                         h2 = new objeto("h2");
                                         h2.addText(x.nom_usu);

                                         var fig = new objeto("figure");
                                            var img = new objeto("img");
                                                img.addAttr([{attr:"src",val:x.foto_usu}]);
                                            fig.addChild(img.returnobj());
                                         var rag = new objeto("div");
                                             rag.addClass(["rating"]);
                                              
                                              var star = 0;
                                              var nostar = 0;

                                             switch(true){
                                               case (x.estre_usu == 100):star = 5;nostar=0;break;
                                               case (x.estre_usu >= 80):star = 4;nostar=1;break;
                                               case (x.estre_usu >= 60):star = 3;nostar=2;break;
                                               case (x.estre_usu >= 40):star = 2;nostar=3;break;
                                               case (x.estre_usu >= 20):star = 1;nostar=4;break;
                                               default:star = 0; nostar = 5;
                                             }

                                             for (var i = 0; i < star; i++) {
                                               var st = new objeto("a");
                                               st.addClass(["good"]);
                                               st.addText(i);
                                               rag.addChild(st.returnobj());
                                             }
                                             for (var i = 0; i < nostar; i++) {
                                               var st = new objeto("a");
                                               st.addText(i + star);
                                               rag.addChild(st.returnobj());
                                             }

                                        elchi3.addChild(h2.returnobj());
                                        elchi3.addChild(fig.returnobj());
                                        elchi3.addChild(rag.returnobj());
        
                                  elch.addChild(elchi.returnobj());
                                   elch.addChild(elchi2.returnobj());
                                    elch.addChild(elchi3.returnobj());

                       elc.addChild(elch.returnobj());
            
             el.addChild(elc.returnobj());

                     var elc = new objeto("div");
                     elc.addClass(["col-sm-5","white-card"]); 

                             var elch = new objeto("div");
                                elch.addClass(["row","nopad"]);;

                                   var elchi = new objeto("div");
                                       elchi.addClass(["col-sm-6"]);
                                   var elchi2 = new objeto("div");
                                       elchi2.addClass(["col-sm-6"]);

                                     var h2 = new objeto("h2");
                                         h2.addText("Propuesta sugerida");
                                     var p = new objeto("p");
                                         p.addClass(["monto","verde"]);
                                         p.addText("S/ " + (x.mont_opc-((x.mont_opc/100)*10)).toFixed(2));
          
                                     elchi.addChild(h2.returnobj());
                                     elchi.addChild(p.returnobj());

                                         h2 = new objeto("h2");
                                         h2.addText("Escribe tu propuesta");
                                         var form = new objeto("form");

                                         var fiel = new objeto("fieldset");
                                            var ip = new objeto("input");
                                            ip.addAttr([{attr:"type",val:"text"}]);
                                            fiel.addChild(ip.returnobj());
                                            var ip = new objeto("input");
                                            ip.addAttr([{attr:"type",val:"button"},{attr:"value",val:"Proponer Ahora"},{attr:"data-toggle",val:"modal"},{attr:"data-target",val:"#ModalOpcion"}]);
                                            fiel.addChild(ip.returnobj());

                                        form.addChild(fiel.returnobj());
                                    elchi2.addChild(h2.returnobj());
                                    elchi2.addChild(form.returnobj());

                              elch.addChild(elchi.returnobj());
                              elch.addChild(elchi2.returnobj());
                  elc.addChild(elch.returnobj());
            el.addChild(elc.returnobj());




             element.addChild(el.returnobj());  


             document.getElementById("Listado").appendChild(element.returnobj());

              inic();
          });

     }
    })
  }

}


function buscar(){

     var num = document.getElementById("monto").value;
 
      if (!/^([0-9])*$/.test(num)){
           alert("Ingresa un monto Valido");
      }
      else {

          window.location.href = '/filtros?num=' + num
         
      }


}

function lanzarpropuesta(){
   
  var opction = document.getElementById("cuentas").selectedIndex ;

  var mont = document.getElementById("montopropu").value;
   

  if(!mont == ""){
     if (!/[0-9]{2,}.{0,1}[0.9]{0,}/.test(mont)){
           alert("Ingresa un monto Valido");
   }
   else{
       $.ajax({
         url:'/registrarPropuesta',
         type:'GET',
         data:{
              index : id,
              monto : mont,
              opc:opction
         },success:function(data){
                console.log(data);
         }
         });
   }
  }
  else{
    console.log("Ingrese almenos un monto");
  }
   

}


