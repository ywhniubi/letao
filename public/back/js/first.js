$(function() {
var currentpage=1;
var pagesize=5;
render();
function render (){
$.ajax({
	type:"get",
	url:"/category/queryTopCategoryPaging",
	data:{page:currentpage,pageSize:pagesize
	},
	dataType:"json",
	success:
		function(info){
			console.log(info);
			var tb=template("tmp",info)
			$("tbody").html(tb);
			$("#pagintor").bootstrapPaginator({
  				bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
  				currentPage:info.page,//当前页
 				totalPages:Math.ceil(info.total/info.size),//总页数
  				size:"small",//设置控件的大小，mini, small, normal,large
  				onPageClicked:function(event, originalEvent, type,page){
    						currentpage=page 	//为按钮绑定点击事件 page:当前点击的按钮值
    						render();
   				
  }
})

		},
	
	
})

}

	$("#add_btn").on("click",function(){
		$("#addmodel").modal("show");



	})


	//配置表单校验非空插件使用
	$("#form").bootstrapValidator({
		// 配置图标
		feedbackIcons:{
		valid: 'glyphicon glyphicon-ok',      // 校验成功
      	invalid: 'glyphicon glyphicon-remove',   // 校验失败
      	validating: 'glyphicon glyphicon-refresh'// 校验中
		},
  fields: {
  	// 配置校验文字
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
})
	
  //注册表单校验成功事件, 阻止校验成功时的默认提交, 通过ajax提交
	$("#form").on("success.form.bv",function(e){
		e.preventDefault();
	})

	 $("#add-c").on("click",function(){
	 	console.log(2);
	 $.ajax({
	 	type:"post",
	 	url:"/category/addTopCategory",
	 	data:
	 		$('#form').serialize(),
	 	
	 	dataType:"json",
	 	success:function(info){
	 	console.log(info);
	 	if(info.success){
	 		$("#addmodel").modal("hide");
	 	render();
	 	}

	 	}

	 })








 })


	










})
