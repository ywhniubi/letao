($(function(){
var currentpage=1;
var pagesize=5;
render();
function render(){


$.ajax({
	type:"get",
	url:"/category/querySecondCategoryPaging",
	data:{
		page:currentpage,
		pageSize:pagesize
	},
	dataType:"json",
	success:function(info){
		console.log(info);
		var tb=template("tmp",info)
		$("tbody").html(tb);
		$("#pagintor").bootstrapPaginator({
			bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
			currentPage:info.page,//当前页
			totalPages:Math.ceil(info.total/info.size),//总页数
			size:"small",//设置控件的大小，mini, small, normal,large
			onPageClicked:function(event, originalEvent, type,page){
    //为按钮绑定点击事件 page:当前点击的按钮值
   				currentpage=page;
  				 render();
  }
});
	}



})
}


















$(".add_btn").on("click",function(){

$("#add_model").modal("show");
	$.ajax({
	type:"get",
	url:"/category/queryTopCategoryPaging",
	data:{
		page:1,
		pageSize:100
	},
	success:function(info){
		var htmltxt=template("tmp2",info);
		$(".dropdown-menu").html(htmltxt);

	}
	


})





})



$(".dropdown-menu").on("click","a",function(){

	var txt = $(this).text();
	$("#dropdownTxt").text(txt);
	 // 获取当前 a 中存储的 id
    var id = $(this).data("id");
    // 设置给 name="categoryId" 的input
    $('[name="categoryId"]').val(id);

  $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");


  });


$("#fileupload").fileupload({
	dataType:"json",
	//文件上传时调用的函数
	done:function(e,data){
		//data.result  就是后台返回的数据
		console.log(data.result)
		//获取图片地址
		var picurl=data.result.picAddr;
		console.log(picurl)
		$('#imgBox img').attr("src", picurl);//将图片地址赋值给图片盒子让其显示
		 // 将图片地址设置给 name="brandLogo" 的 input 用于提交
      $('[name="brandLogo"]').val(picurl);


     
         // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
	}

})




  // 5. 进行表单校验初始化
  $("#form").bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)']
    // 需要对隐藏域进行校验, 不能排除隐藏域, 将 excluded 置为 [], 表示对所有 input 进行校验
    excluded: [],


    // 指定校验时显示的图标, 固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
       brandName: {
         validators: {
           notEmpty: {
             message: "请输入二级分类"
           }
         }
       },
       brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });

//6. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 提交
  $('#form').on("success.form.bv", function( e ) {
    console.log(1)

    e.preventDefault();

  console.log(2)
    // 通过 ajax 提交
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          alert(1)
          // 关闭模态框
          $('#addModal').modal("hide");

          // 页面需要重新渲染, 重新渲染第一页
          currentPage = 1;
          render();

          // 表单需要重置, 文本和状态都要重置
          $('#form').data("bootstrapValidator").resetForm(true);

          // 重置只能重置表单元素, 下拉菜单的按钮和图片需要手动重置
          $('#dropdownTxt').text("请选择一级分类");
          $('#imgBox img').attr("src", "images/none.png");
        }
      }
    })

  })

















}))