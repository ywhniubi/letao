$(function(){
		render();
	function getStorage (){
		var jsonStr=localStorage.getItem("search_list")||"[]";
		var arr=JSON.parse(jsonStr);
		return arr


}  //读取本地数据  并且以数组的形式反回

	function render(){
		var arr=getStorage();//获得数组
		console.log(arr)
		var htmlStr=template("history_tmp",{list:arr})//进行页面渲染
		$(".letao_history").html(htmlStr);

	}

// 功能2: 清空历史记录功能
  // (1) 添加清空点击事件(事件委托绑定事件)
  // (2) 使用 removeItem() 清除本地存储的内容
  // (3) 页面重新渲染
$(".letao_history").on("click",".icon_empty",function(){

    // 确认框 confirm
    // 参数1: 确认框内容
    // 参数2: 标题文本
    // 参数3: 按钮文本, 数组
    // 参数4: 关闭确认框后的回调函数
    mui.confirm("你确认要清空历史记录嘛", "温馨提示", ["取消", "确认"], function( e ) {
      console.log( e );
      // e.index 指点击的按钮对应的下标
      if ( e.index === 1 ) {
        // 确认按钮
        localStorage.removeItem("search_list"); // 清空history
        render(); // 重新渲染
      }
    })





})
//功能3点击X删除单个历史纪录
// (1)通过时间委托点击事件
//取出数组，从自定义数组中读取下标，通过下标删除对应项
// arr.splice(开始的位置，删除的个数)
//会改变原数组
//将修改后的数组，转成json str，存储到本地
//重新区渲染

$(".letao_history").on("click",".icon_delete",function(){
	var index=$(this).data("index")
	var arr=getStorage();
	arr.splice(index,1);
	var jsonStr=JSON.stringify( arr );
	localStorage.setItem("search_list",jsonStr);
	render();

})

//添加历史功能
	// 1.给搜索按钮添加注册事件
	// 2.获取输入框的内容，添加到数组的最前面
	// 3.将修改后的数组,存到本地中
	// 4.重新渲染

$(".search_body .btn").on("click",function(){
	var val=$(".search_body input").val();
	if(val == ""){
		mui.totast("请输入关键字")
		return;
	}

		//获取数组
		var arr=getStorage();

console.log(arr)
		//如果数组中有重复的需要删除并且在数组的头部添加一个数据  数组的查询 查询到返回对应的下标 查询不到返回-1
		if(arr.indexOf(val)!==-1){
			arr.splice(index,1)

		}
		//数组的长度不能{超过10
				if(arr.length>10){
					arr.pop();
				}
		arr.unshift(val)

		localStorage.setItem("search_list",JSON.stringify(arr));

		render();

		$(".search_body input").val("")
		// location.href="searchList.html?val="+val+""
})







})