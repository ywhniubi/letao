



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

		// 右侧模态框显示与隐藏
		$(".exit-right").click(function(){

			$("#model").modal("toggle")



		})


//模态框退出按钮应该在服务器端调用后台的接口在服务器端销毁该用户的登陆状态
		$("#logoutBtn").click(function(){
		$.ajax({
			type:"get",
			url:"/employee/employeeLogout",
			dataType:"json",
			success:function(info){
				console.log(info)
				if(info.success){    //判断返回的数据为true即跳转到登录页
					location.href="login.html"
				}
			}
		})


		})

})

