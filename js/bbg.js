/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/banner2.jpg"},
  {"i":1,"img":"images/banner1.jpg"},
  {"i":2,"img":"images/banner3.jpg"},
	{"i":3,"img":"images/banner4.jpg"},
	{"i":4,"img":"images/banner5.jpg"},
	{"i":5,"img":"images/banner6.jpg"}
];
var slider={
	LIWIDTH:0,//保存每个li的宽度，其实就是#slider的初始宽
	DURATION:1000,//动画的总时间
	WAIT:3000,//自动轮播的等待时间
	timer:null,//一次性定时器
	canAuto:null,//自动播放
	init:function(){
		this.LIWIDTH=parseFloat($('#slider').css('width'));
		//console.log(this.LIWIDTH*6);
		this.updateView();//更新页面
		//为id为indexs的ul添加鼠标进入事件代理，只有不是hover的li才能响应事件
		$('#indexs').on("click",'li:not(.hover)',
			function(e){
				var $target=$(e.target);//获得目标元素$target
				//调用move方法传入要移动的个数：目标元素的内容-目标元素的兄弟中class为hover的内容
				this.move($target.html()-$target.siblings('.hover').html());
			}.bind(this));//指得是slider中的this
		//当鼠标进入#slider是，将canAuto改为true
		$('#slider').hover(
			function(){this.canAuto=false;}.bind(this),
			function(){this.canAuto=true;}.bind(this)
		);
		this.autoMove();
	},
	autoMove:function(){//启动自动轮播
		//启动一次性定时器
		this.timer=setTimeout(
			function(){
				if (this.canAuto){//如果
					this.move(1);//移动一个
				}else{
					this.autoMove();
				}
			}.bind(this),this.WAIT
		);
	},
	move:function(n){
		clearTimeout(this.timer);//停止一次性定时器
		this.timer=null;
		$('#imgs').stop(true);//停止动画。防止叠加
		//获得#imgs当前的left，转为浮点数
		var left=parseFloat($('#imgs').css('left'));
		//console.log(left);
		//如果n<0
		if (n<0){
			n*=-1;//将n转为正数
			//先修改数组，先删除结尾n个元素，拼接到开头
			imgs=imgs.splice(imgs.length-n,n).concat(imgs);
			this.updateView();//更新页面
			//修改#imgs的left为left-n*LIWIDTH
			$('#imgs').css('left',left-n*this.LIWIDTH+"px");
			//启动动画，在DURATION时间内，left移动到0
			$('#imgs').animate({left:'0'},this.DURATION);
			this.autoMove.bind(this);//启动自动轮播
			this.updateView();//更新页面
		}else{	//否则 ，左移，先移动，在该数组
			//让#imgs的ul再DURATION事件内，left变为
			$('#imgs').stop(true);
			$('#imgs').animate(
				{left:-n*this.LIWIDTH+"px"},
				this.DURATION,
				//在动画结束后调用endMove，替换this，传入参数n
				this.endMove.bind(this,n)
			);
		}
	},
	endMove:function(n){
		//删除imgs数组的开头的n个元素再拼到imgs数组的结尾
		imgs=imgs.concat(imgs.splice(0,n));
		this.updateView();//更新页面
		//设置imgs的left为0；
		$('#imgs').css('left',0);
		this.autoMove();//启动自动轮播
	},
	updateView:function(){//将数组中的元素更新到页面
		//遍历imgs数组中每个图片对象,同时生成空字符串html
		for (var i=0,html="",idxs="";i<imgs.length;i++){
			html+="<li><img src=' "+imgs[i].img+" '></li>";
			idxs+="<li>"+(i+1)+"</li>";
		}
		//设置id为imgs的内容为html其宽度为LIWIDTH*imgs 的元素个数
		$('#imgs').html(html).css('width',this.LIWIDTH*imgs.length);
		//设置id为indexs的内容为idxs
		$('#indexs').html(idxs);
		//获得#indexs下的和imgs中第一个元素的i属性对应的li，设置其class为hover，在选择兄弟中的class为hover的li清除其class
		$('#indexs>li:eq('+imgs[0].i+')').addClass('hover')
			.siblings('.hover')
			.removeClass('hover');
	}
}
slider.init();

/**获取banner图片的高度**/
var a=$('#slider #imgs li img').css('height');
//console.log(a);

/*首页top旗下网站*/
	$('.navLink').mouseover(function(e){
		e.preventDefault();
		$('.qxwz').css('display','block');
		$(document).on('click',function(){
			$('.qxwz').css('display','none');
			$(document).unbind("click");
		});
});
/* 页面顶部搜索框获得焦点 value为none*/
$(function() {
	var input = $('.secInput'),
	inval = input.val();
	input.bind({
		focus: function() {
			var in_this = $(this);
			if (in_this.val() == inval) {
				in_this.val('');
			}
		},
		blur: function() {
			var in_this = $(this);
			if (in_this.val() == '') {
				in_this.val(inval);
			}
		}
	});
})
/*滚轮事件*/
$(document).scroll(function(){
	///console.log($(document).scrollTop());
	if($(document).scrollTop()>100){
		$('.header').addClass("top1-top")
	}else{
		$('.header').removeClass("top1-top")
	}
});

/*返回页面顶部*/
$("body").append("<a id='totop' class='hiddien'></a>");
var totop = $('#totop');
$('#totop').on('click',function(){
	$('html,body').animate({scrollTop:0},1000)
	return false;
});

/*判断页面距离页面底部的距离
滚轮事件
$(document).scroll(function(){
	var doc = document,
		win = window,
		$ScrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();
		console.log($ScrollBottom);
	if($ScrollBottom>500){
		$('.o-none').css({'visibility':'hidden','opacity':0});
	}else if($ScrollBottom<300){
		$('.o-none').css({'visibility':'visible','opacity':1});
	}else{
		$('.o-none').css({'visibility':'hidden','opacity':0});
	}
});*/



/**商业 下面的轮播图**/

function animate(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var flag = true;
		for (var k in json) {
			if (k === "opacity") {
				var leader = getStyle(obj, k) * 100;
				var target = json[k] * 100;
				var step = (target - leader) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				leader = leader + step;
				obj.style[k] = leader / 100;
			} else if (k === "zIndex") {
				obj.style.zIndex = json[k];
			} else {
				var leader = parseInt(getStyle(obj, k)) || 0;
				var target = json[k];
				var step = (target - leader) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				leader = leader + step;
				obj.style[k] = leader + "px";
			}
			if (leader !== target) {
				flag = false;
			}
		}
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 15);
}

function getStyle(obj, attr) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(obj, null)[attr];
	} else {
		return obj.currentStyle[attr];
	}
}



/**
 * Created by Administrator on 2016/9/23 0023.
 */
window.onload=function(){
	var flag=true;
	var wrap=document.getElementById("wrap");
	var slide=document.getElementById("slide");
	var arrow=document.getElementById("arrow");
	var arrRight=document.getElementById("arrRight");
	var arrLeft=document.getElementById("arrLeft");
	var lis=slide.getElementsByTagName("li");
	var config = [
		{
			"width": 144,
			"top": 80,
			"left":100,
			"opacity": 0.2,
			"zIndex": 2
		},//0
		{
			"width": 154,
			"top": 100,
			"left":180,
			"opacity": 0.4,
			"zIndex": 3
		},//1
		{
			"width": 164,
			"top": 120,
			"left": 260,
			"opacity": 0.6,
			"zIndex": 4
		},//2
		{
			width: 174,
			top: 140,
			left: 340,
			opacity: 0.8,
			zIndex: 5
		},//3
		{
			"width": 184,
			"top": 160,
			"left":420,
			"opacity":1,
			"zIndex": 6
		},//4
		{
			"width": 174,
			"top": 140,
			"left": 500,
			"opacity": 0.8,
			"zIndex": 5
		},//5
		{
			"width": 164,
			"top": 120,
			"left":580,
			"opacity":0.6,
			"zIndex": 4
		},//6
		{
			"width": 154,
			"top": 100,
			"left": 660,
			"opacity":0.4,
			"zIndex": 3
		},//7
		{
			width: 144,
			top: 80,
			left: 740,
			opacity: 0.2,
			zIndex: 2
		}//8

	];//其实就是一个配置单 规定了每张图片的大小位置层级透明度
	//鼠标移到盒子上，渐渐显示箭头；
	wrap.onmouseover=function(){
		animate(arrow,{"opacity":1})
	}
	//鼠标离开盒子，箭头渐渐消失
	/*wrap.onmouseout=function(){
		animate(arrow,{"opacity":0})
	}*/
	//让li中得每个图片都显示到相应位置上
	assign();
	//点击右箭头让轮播图旋转
	arrRight.onclick=function(){
		if(flag){//阀门是打开着的才能执行
			flag=false;//点击之后就立即把阀门关闭
			//arr.push(arr.shift());//把最前的元素放到最后
			config.push(config.shift());
			//产生了配置单之后 还要让每一个li根据新的配置单重新到底目标(而且是动画效果)
			assign();
		}

	}
	//点击左箭头让轮播图旋转
	arrLeft.onclick=function(){
		if(flag){
			flag=false;
			config.unshift(config.pop());
			assign();
		}

	}
	/**
	 * 这个函数可以让每一个li根据配置单去到达目标位置
	 */
	function assign(){
		for(var i=0;i<lis.length;i++){
			animate(lis[i],config[i],function () {
				//这个回调函数是动画执行完才执行
				flag = true;
			})
		}
	}






}


/**下面数字的滚动效果**/

$(document).scroll(function(){
	var doc = document,
		win = window,
		$ScrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();
	//console.log($ScrollBottom);
	if($ScrollBottom<1220){
		//console.log($('#showNumBox_1 li.forth p'));
		$('#showNumBox_1 li.forth p').addClass('forth_top');
		$('#showNumBox_1 li.five p').addClass('five_top');
		$('#showNumBox_1 li.two p').addClass('two_top');
		$('#showNumBox_2 li.three p').addClass('three_top');
		$('#showNumBox_2 li.one p').addClass('one_top');
		$('#showNumBox_2 li.zreo p').addClass('zreo_top');
		$('#showNumBox_3 li.six p').addClass('six_top');
		$('#showNumBox_3 li.eight p').addClass('eight_top');
		$('#showNumBox_3 li.nine p').addClass('nine_top');
		$('#showNumBox_3 li.zreo p').addClass('zreo_top');
	}else{
		$('#showNumBox_1 li.forth p').removeClass('forth_top');
		$('#showNumBox_1 li.five p').removeClass('five_top');
		$('#showNumBox_1 li.two p').removeClass('two_top');
		$('#showNumBox_2 li.three p').removeClass('three_top');
		$('#showNumBox_2 li.one p').removeClass('one_top');
		$('#showNumBox_2 li.zreo p').removeClass('zreo_top');
		$('#showNumBox_3 li.six p').removeClass('six_top');
		$('#showNumBox_3 li.eight p').removeClass('eight_top');
		$('#showNumBox_3 li.nine p').removeClass('nine_top');
		$('#showNumBox_3 li.zreo p').removeClass('zreo_top');
	}
});
