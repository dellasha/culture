

/*메인 D-day*/
$(function(){
  activateScene2();
  // Scene 2를 표시
  function activateScene2(){
     var $content = $('#day-chart'),
         $charts = $content.find('.chart');

         // 인포그래픽 영역이 오른쪽에서 슬라이드 인
         $content.stop(true).animate({
             right:0},
             1200, 'easeInOutQuint');
         // 각 원형 차트의 회전 애니메이션 효과 구현
         $charts.each(function(){
             var $chart = $(this),
                 //각 차트 영역에 있는 '마스크' 요소를 저장하고 각도를 0으로 지정
                 $circleLeft = $chart.find('.left .day-box-inner')
                     .css({transform: 'rotate(0)'}),
                 $circleRight = $chart.find('.right .day-box-inner')
                     .css({transform: 'rotate(0)'}),
                 // 원형 차트에 표시할 백분율값을 얻음
                 $percentNumber = $chart.find('.d_day span'),
                 diffDay = $percentNumber.text();

                 diffDayMax = $chart.find('.d_day span').attr("data-max");
                 percentData = ((diffDay * 100) / diffDayMax).toFixed("2");
                 percentData = (360 - (percentData * 360) / 100).toFixed("2"),

                 //원형 차트의 백분율 표시를 우선 0으로 지정
                 $percentNumber.text(diffDayMax);
                 //각도값에 따라 원형 차트를 움직이게 하는 회전 애니메이션 효과 구현
                 $({percent:0}).delay(1000).animate({
                     percent: percentData
                 },{duration:1500,
                     progress:function(){
                         var now = this.percent,
                             deg = now; // 360 - (now * 360) / 100,
                             degRight = Math.min(Math.max(deg,0),180),
                             degLeft = Math.min(Math.max(deg - 180, 0),180);
                         $circleRight.css({transform:'rotate('+degRight+'deg)'});
                         $circleLeft.css({transform:'rotate('+degLeft+'deg)'});
                         //console.log( i++ + "->" + Math.floor(now)  + "=" + ( Math.floor((diffDayMax * Math.floor(360 - Math.floor(now))) / 360 )) );
                         $percentNumber.text((Math.floor((diffDayMax * Math.floor(360 - Math.floor(now))) / 360 )));
                     }
                 });
             });
         }
 });



