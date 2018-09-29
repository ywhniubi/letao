$(function() {
var page=1;
var pagesize=5
render();
function render (){
$.ajax({
	type:"get",
	url:"/category/queryTopCategoryPaging",
	data:{page:page,pagesize:pagesize
	},
	dataType:"json",
	success:
		function(info){
			console.log(info);
			var tb=template("tmp",info)
			$("tbody").html(tb);
		}
	
	
})

}





})
