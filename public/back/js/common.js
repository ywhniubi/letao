


console.log(2)

$(document).ajaxStart(function(){
	NProgress.start();
})
$(document).ajaxStop(function(){
	NProgress.done();
})