$.ajax({
	type:"get",
			url:"/employee/checkRootLogin",
			dataType:"json",
			success:function(info){
				console.log(info)
				if(info.error==400){
					//未登录拦截到登录页
					location.href="login.html"
				}
			}
})
//登陆拦截
// 如果当前用户没有登陆，需要拦截登陆
// 但是不知道有没有登陆后台才知道，所以需要发送请求获取用户登陆状态