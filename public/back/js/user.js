


$(function(){
  var currentid;
  var isDelete;
var currentPage=1;
var pageSize=5;
render();
function render(){
$.ajax({	
			type:"get",
			url:"/user/queryUser",
			data:{page:currentPage,pageSize:pageSize},
			dataType:"json",
			success:function(info){
        console.log(info);
				var htmlstr=template("tmp",info);
	 			$('tbody').html(htmlstr);
	 			$("#pagintor").bootstrapPaginator({
  					bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
  					currentPage:info.page,//当前页
  					totalPages:Math.ceil( info.total / info.size ),//总页数
  					size:"small",//设置控件的大小，mini, small, normal,large
  					onPageClicked:function(a, b, c,page){
  	   // 更新当前页

            currentPage = page;
            // 重新根据 render
            render();
    //为按钮绑定点击事件 page:当前点击的按钮值
  }
})
}
})




}

$("tbody").on("click","button",function(){
  $("#usermodel").modal("show");  //模态框显示
  currentid=$(this).parent().attr("data-id")//拿到对应用户的id 
  isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });



$("#userupdate").on("click",function(){
$.ajax({
    type:"post",
    url:"/user/updateUser",
    data:{id:currentid,isDelete:isDelete},
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
      $("#usermodel").modal("hide");
      render();
      }
    }







})



})


})








