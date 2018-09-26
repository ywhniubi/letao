
	$("#form").bootstrapValidator({
	//配置校验字段 校验哪些input表单
fields:{
	username: {
		//配置校验规则
		validators: {
			notEmpty: {
				message:"当前用户输入不能为空"
				},
				// 长度校验
				stringLength: {
					min:2,
					max:12,
					message: "长度为6-12位",
				},callback:{
					message:"用户名错误"
				}
			}
		},
	password: {
		validators: {
		notEmpty:{
			message:"您的输入为空"
		},
		stringLength: {
					min:6,
					max:12,
					message: "长度为6-12位",
				},
				callback: {
					message:"密码错误",
				}
	}
}

	},feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',//校验成功
    invalid: 'glyphicon glyphicon-remove',///检验失败
    validating: 'glyphicon glyphicon-refresh'//校验中
  },
})
		 
	//配置校验字段 校验哪些input表单



$("#form").on("success.form.bv",function(e){
	e.preventDefault();      
	$.ajax({
		type:"post",
		url:"/employee/employeeLogin",
		data: $("#form").serialize(),
		dataType:"json",
		success:function(info){
			if(info.success==true){
				location.href="index.html";
			}
			if(info.error==1000){
				
				$("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
			}else if(info.error==1001){
				$("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
			}
		}

	})                        
})


$("#reset").click(function(){

	$("#form").data("bootstrapValidator").resetForm(true);

})


