



//进度条功能
$(document).ajaxStart(function(){
	NProgress.start();
})
$(document).ajaxStop(function(){
	NProgress.done();
})




// 1.二级菜单切换
$(function(){
	$(" .catrioy .category").click(function(){

		$(" .catrioy  .left_child").stop().slideToggle();
	})





})



//2.左侧菜单栏切换
$(function(){
	$(".menu-left").click(function(){
		$(".lt_leftside").css("left","-180px")
		$(".lt_leftside").css("transition","1s")
		$(".lt_rightside").css("padding-left","0px")
		$(".lt_rightside").css("transition","1s")
		$(".right_top").css("padding-left","10px")
		$(".right_top").css("transition","1s")
	})


		$(".exit-right").click(function(){

			$("#model").modal("toggle")



		})

})