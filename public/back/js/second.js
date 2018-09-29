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
		$(".slide_menu").html(htmltxt);

	}
	


})





})

$("#slide_btn").on("click",function(){
	console.log(1)

$(".slide_menu").toggle("hide")
})



$(".slide_menu").on("click","a",function(){
	var txt = $(this).text();
	$("#dropdownTxt").text(txt);
	 // 获取当前 a 中存储的 id
    var id = $(this).data("id");
    // 设置给 name="categoryId" 的input
    $('[name="categoryId"]').val( id );





})

$("#fileupload").fileupload({
	dataType:"json",
	//文件上传时调用的函数
	done:function(e,data){
		//data.result  就是后台返回的数据
		console.log(data.result)
		//获取图片地址
		var picurl=data.result.picAddr;

		$('#imgBox img').attr("src", picurl);//将图片地址赋值给图片盒子让其显示
		 // 将图片地址设置给 name="brandLogo" 的 input 用于提交
      $('[name="brandLogo"]').val( picUrl );


	}

})























}))