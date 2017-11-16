

$(".can").click(function(){
let i=this.dataset.can;

$.ajax({
	url:"CancelarRecibo",
	type:"POST",
	data:{"i":i},
	success:function(e){
      if(e.err){
      	alert("Ocurrio un error")
      	return;
      }

      location.reload(true);
	}
})

})