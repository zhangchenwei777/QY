
/**banner下方导航栏 过渡红色小框框**/

var a_width=$('#btn_news>li').css('width');
//console.log(a_width);
var spanborder=$('#newRedLine');
spanborder.css('width',a_width);
$('#btn_news').on('mouseover','li',function(){
  for(var i=0,l=105;i<$(this).index();i++){
    l+=Number($($('#btn_news li')[i]).css('width').slice(0,$($('#btn_news li')[i]).css('width').length-2))+2;
    $(this).addClass('in').siblings().removeClass('in');

  }
  spanborder.css('left',l+'px');
});


/*鼠标移入  下面沿x轴倾斜*/
$('.rotex1').mouseover(function(){
   $('.new1').addClass('new-in').addClass('new-show')
     .siblings().removeClass('new-show');
})
$('.rotex2').mouseover(function(){
  $('.new2').addClass('new-in').addClass('new-show')
    .siblings().addClass('new-none').removeClass('new-show');
})
$('.rotex3').mouseover(function(){
  $('.new3').addClass('new-in').addClass('new-show')
    .siblings().addClass('new-none').removeClass('new-show');
})
$('.rotex4').mouseover(function(){
  $('.new4').addClass('new-in').addClass('new-show')
    .siblings().addClass('new-none').removeClass('new-show');
})
$('.rotex5').mouseover(function(){
  $('.new5').addClass('new-in').addClass('new-show')
    .siblings().addClass('new-none').removeClass('new-show');
})














