/*导航栏——————红色过渡线条*/
var li_width=$('#nav>li').css('width');//获得li的宽度
//console.log(li_width);
var span=$('#header_redLine'); //获得span
span.css('width',li_width);  //把li的宽度赋值给span
$('#nav').on('mouseover','li',function(){
  var p=this.getElementsByTagName('p')[0];//找到标签为p的下拉菜单
  span.css('width',$(this).css('width'));
  for(var i=0,l=0;i<$(this).index()-1;i++){
    l+=Number($($('#nav li')[i]).css('width').slice(0,2))+4;
    //console.log($('#nav li')[i]);
  }
  span.css('left',l+'px');
  if(!p){return false};//判断是否有下拉菜单
  p.style.display='block';
});
$('#nav').on('mouseout','li',function(){
  span.css({'width':li_width,'left':'0px'});
  var p=this.getElementsByTagName('p')[0];
  if(!p){return false};
  p.style.display='none';
})





/**banner下方导航栏 过渡红色小框框**/
var a_w=$('.cont3_text>a').css('width');
//console.log(a_width);
var span_bottom=$('.cont3_red');
span_bottom.css('width',a_w);
$('.cont3_text').on('mouseover','a',function() {
  for (var j = 0, length = 815; j < $(this).index(); j++) {
    length += Number($($('.cont3_text>a')[j]).css('width').slice(0, $($('.cont3_text>a')[j]).css('width').length - 2)) ;
  }
  span_bottom.css('left',length+"px");
})
$('.cont3_text').on('mouseout','a',function() {

  span_bottom.css('left',810+"px");
})



/**商业 置业 金融下红色过渡线条**/
var a_w=$('#cont3_text a').css('width');
var span_w=$('.cont3_red');
span_w.css('width',a_w);
$('#cont3_text').on('mouseover','a',function(){
  for(var i= 0,l=0;i<$(this).index();i++){
    l+=90;
  }
  span_w.css('left',l+'px');
});

/**content3**/

$('.anim-text1').mouseover(function(){
    $('.cont-text1').css({'opacity':'1'}).siblings().css({'opacity':'0'});
    $('.bj1').addClass('bj_in').siblings().removeClass('bj_in');
    //$('.cont-text1 span').addClass('text-in-this');
    $('.cont-text1>div').addClass('top');
    $('.cont-text1').siblings().children().removeClass('top');
});
$('.anim-text2').mouseover(function(){
    $('.cont-text2').css({'opacity':'1'}).siblings().css({'opacity':'0'});
    $('.bj2').addClass('bj_in').siblings().removeClass('bj_in');
    //$('.cont-text2 span').addClass('text-in-this');
    $('.cont-text2>div').addClass('top');
    $('.cont-text2').siblings().children().removeClass('top');

});
$('.anim-text3').mouseover(function(){
    $('.cont-text3').css({'opacity':'1'}).siblings().css({'opacity':'0'});
    $('.bj3').addClass('bj_in').siblings().removeClass('bj_in');
    //$('.cont-text3 span').addClass('text-in-this');
    $('.cont-text3>div').addClass('top');
    $('.cont-text3').siblings().children().removeClass('top');

});
