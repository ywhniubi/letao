$(function(){

var currentpage=1;
var pagesize=5;
	render();
	var picArr = [];  // 维护所有用于提交的图片  用来获取上传图片的长度如果获取dom元素比较麻烦成本所以用数组维护
function render(){
$.ajax({
	url:"/product/queryProductDetailList",
	type:"get",
	data:{
		page:currentpage,
		pageSize:pagesize,
	},
	dataType:"json",
	success:function(info){
		console.log(info)
		var htmstr=template("product-tmp",info)
		$("tbody").html(htmstr);
		$("#paginator").bootstrapPaginator({
			//指定版本号	
			bootstrapMajorVersion:3,
			//总条数
			totalPages:Math.ceil(info.total/info.size),
			//当前页
			currentPage:info.page,
			//点击事件
			onPageClicked:function(a,b,c,page){
				//page 当前点击的页码
				currentpage=page;

				render();

			},
			//itemtext是个函数在每个按钮初始化的时候都会调用这个函数
			//将这个函数的返回值作为该按钮的文本
			//type：按钮的类型 page first last prev next
			//page:点击按钮跳转的页码
			//current：当前页
			itemTexts:function( type,page,current){
				switch(type){
					case "page":
						return page;
					case "first":
						return "首页";
					case "last":
						return "尾页";
					case "next":
						return"下一页";
					case "prev":
						return"上一页";
				}

			},
			//每个按钮在初始化的时候都调用一次该函数将该函数的返回值作为按钮的提示文本
			tooltipTitles:function(type,page,current){
				switch(type){


					case "page":
						return "前往第"+page+"页";
					case "first":
						return "前往首页";
					case "last":
						return "前往尾页";
					case "next":
						return"前往下一页";
					case "prev":
						return"前往上一页";

						}
			},
			//使用bootstrap提示框的组件
			useBootstrapTooltip: true

		})


	}





})



}

	$(".add_btn").on("click",function(){
		$("#add_model").modal("show")
		$.ajax({
			url:"/category/querySecondCategoryPaging",
			type:"get",
			data:{
				page:1,
				pageSize:100
			},
			dataType:"json",
			success:function(info){
				console.log(info)
				var htmlstr=template("secquy_tmp",info)
				$(".dropdown-menu").html(htmlstr)
				 $('#imgBox img').attr("src", "images/none.png");
			}





		})

	})
	$(".dropdown-menu").on("click","li",function(){
		var str=$(this).text();	
		$("#dropdownTxt").text(str);
		   // 获取 id, 设置给隐藏域
    		var id = $(this).data("id");
  		  $('[name="brandId"]').val( id );

    // 手动将 name="brandId" 的input, 校验状态置成 VALID
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
	
	$("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
       
     	var picUrl=data.result.picAddr
     	 console.log(picUrl);
     	// 将图片对象添加到这个数组中
     	 picArr.unshift( data.result );
     	//在dom结构中用prepend 往前面添加
         $('#imgBox').prepend('<img src="'+ picUrl +'" width="100" height="100" alt="">');
         //如果图片超过三张 移除最后一张
         // 1.dom 结构中移除最后一张图片
         // 2.维护数组中移除最后一个数组项目
         if(picArr.length>3){
         	   // 找imgBox中最后一个img类型的元素, 让其自杀
         $('#imgBox img:last-of-type').remove();
        // 数组移除最后一项
         picArr.pop();

         }
           // 更新表单校验状态 picStatus 为 VALID
      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }

      }
});

 // 5. 调用插件方法, 进行表单校验
  $('#form').bootstrapValidator({
    // 对隐藏域也校验
    excluded: [],
    // 指定校验时显示的图标, 固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段
    fields: {
  	brandId: {
        validators: {
         	 notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
     proName:{
     	  validators: {
         	 notEmpty: {
            message: "请输入商品名称"
          }
        }
    },
    proDesc:{
    	 validators: {
         	 notEmpty: {
            message: "请输入商品描述"
          }
        }
    },
     // 请求库存必须是, 非0开头的数字
      /*
      * 正则, ^ 以...开头, $ 以...结尾
      * [] 内, 表示可以出现的字符
      * [1-9], 表示可以出现 1,2,3,4....9
      * \d 表示 0-9的数字
      *

        * 表示 0 个 或 多个
        + 表示 1 个 或 多个
        ? 表示 0 个 或 1个
        {n}   表示出现 n次
        {n,m} 表示出现 n-m 次

      // * */  
      // 正则是复制的哈哈哈

    num:{
    	validators: {
         	 notEmpty: {
            message: "请输入商品库存"
          },
           regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
    },
    size:{
    	validators: {
         	 notEmpty: {
            message: "请输入商品尺码"
          }, 
           regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '要求尺码为 xx-xx 的格式, 例如 32-40'
          }
        }
    },
    price:{
    	validators: {
         	 notEmpty: {
            message: "请输入商品现价"
          }
        }
    },
    oldPrice:{
    		validators: {
         	 notEmpty: {
            message: "请输入商品原价"
          }
        }

    },
       picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }





    }




})
$("#form").on("success.form.bv",function(e){
	e.preventDefault();//阻止表单默认提交
var datastr=$("form").serialize();//这个方法只能获得name的表单元素的值里面没有接口需要的图片地址和图片名称所以要进行拼接的
datastr+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
datastr+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[0].picAddr;
datastr+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[0].picAddr;

$.ajax({
	url:"/product/addProduct",
	type:"POST",
	data:datastr,
	dataType:"json",
	success:function(info){
		console.log(info);
		if(info.success){
			// 关闭模态框
			$("#add_model").modal("hide");
			//重新渲染第一页
			currentpage=1;
			render();
			//重置表单
			$('#form').data("bootstrapValidator").resetForm(true);
			  // 下拉框按钮和图片不是表单元素, 需要手动重置
          $('#dropdownTxt').text("请选择二级分类");
          // 移除所有的图片
          $('#imgBox img').remove();
          picArr = []; // 同步数组
		}
	}




})

})
















})