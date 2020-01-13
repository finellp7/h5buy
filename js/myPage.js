$(function(){
    // 当前屏幕的高度
     var k=$(window).height();
     var flag=false;//控制动画（页面加载为false）
     // 每点击一次，屏幕向下滚动
     $(".next").click(function(){
       $.fn.fullpage.moveSectionDown();
     });
    $('#fullpage').fullpage({
        // 是否显示项目导航
        navigation:true,
        // navigationPosition:"left",
        // 滚动速度单位为毫秒
        scrollingSpeed:1200,
        afterLoad:function(anchorLink,index){
            // 滚动到某一屏后的回调函数
            if(index==2){//flag==false防止第三屏到第二屏执行第二屏动画
            // 先让继续下一页消失
            $(".next").fadeOut();
            //     // alert("this is 2")
            // easeOutBack（easing插件一定要放在时间后面）
            $(".search").show().animate({"right":370},1500,"easeOutBack",function(){
                // 方块走进来，沙发两个字显示出来
               $(".search-words").animate({"opacity":1},500,function(){
                $(".search").hide();
                // 图片往右上角走，然后缩小   
                $(".search-02-1").show().animate({"height":30,"right":250,"bottom":452},1000,function(){
                    flag=true; //如果flag等于true所有动画执行完毕
                });
                // 同时沙发图片变大
                $(".goods-02").show().animate({"height":218},1000)
                // 同时白色文字渐渐的显示出来
                // $(".words-01").hide();只要words-02出现就会把words-1盖住
                $(".words-02").animate({"opacity":1},500,function(){
                    // 第二屏幕动画结束，next显示出来
                    $(".next").fadeIn();
                });
               }); 
            });
            }
        },
        // onLeave滚动前的回调函数，接收三个参数
        // 3个参数：index 是离开的“页面”的序号，从1开始计算；nextIndex 是滚动到的“页面”的序号，从1开始计算；direction 判断往上滚动还是往下滚动，值是 up 或 down。 
        onLeave:function(index,nextIndex,direction){
            // 离开前先消失掉
            $(".next").fadeOut();
            // alert(1);
            if(index==2&&nextIndex==3){
            // 先让继续下一页消失
                // 当第二屏幕往第三屏幕滚动的时候，沙发显示并且第三屏幕跑 白色盒子显示
                // 因为沙发是相对于屏幕的定位，botton为0时就是在屏幕底部（computer是底对齐的）
                // 沙发要往第三屏幕走，走的距离就是大盒子-（大沙发距大盒子的距离shirt-03+大盒子对屏幕的距离main底部的高度） (当前屏幕-250)
                $(".shirt-02").show().animate({"bottom":-(k-250),"width":207,"left":260},2000,function(){
                    $(".img-01-a").animate({"opacity":1},500,function(){
                      $(".btn-01-a").animate({"opacity":1},500,function(){
                       $(".next").fadeIn();
                      });  //有先后顺序
                    })
                });//注意层级问题，防止盒子跑下来大家都为0，后来者居上
                $(".cover").show();
            }
            // 第三屏到第四屏的滚动
            if(index==3&&nextIndex==4){
              $(".shirt-02").hide();
              // 同时让斜着的出现，倾斜沙发相对于main定位的所以还需要走一段距离（坐标位置判断移动距离）
             // 沙发的距离 当前屏幕的高度 -250 +第三屏幕的50距离
              $(".t1f").show().animate({"bottom" : -((k - 250) + 50), "left": 260 }, 2000, function(){
                $(".t1f").hide();//动画做完毕，自己隐藏
                $(".car-img").show();
                $(".car").animate({"left":"150%"},3000,"easeInElastic",function(){
                    $(".note").show();
                    $(".note-img,.words-04-a").animate({"opacity":1},1000,function(){
                       $(".next").fadeIn();
                    });
                    
                });
              });
            }
            // 第四屏到第五屏的滚动
            if(index==4&&nextIndex==5){
                // 小手上来
             $(".hand-05").animate({"bottom":0},2000,function(){
                // 鼠标显示
              $(".mouse-05-a").fadeIn();//fadeIn也是显示出来
              // 沙发从800到70
              $(".t1f-05").show().animate({"bottom":70},1000,function(){
                // 卡片上走 走完之后，我们的文字翻转
                $(".order-05").animate({"bottom":390},function(){
                  $(".words-05").addClass("words-05-a");
                 $(".next").fadeIn();

                });

              });
             });
            }
            // 第五屏到第六屏的滚动
            if(index==5&&nextIndex==6){
                // 沙发的距离 当前屏幕的高度 减去 box的bottom 500
            $(".t1f-05").animate({"bottom":-(k-500),"left":"40%","width":65},1500,function(){
                $(this).hide();
                // 写在回调函数里面盒子会先等沙发掉落消失再运动，所以要分开写
            });
            $(".box-06").animate({"left":"38%"},1500,function(){
            $(".box-06").animate({"bottom":40},500,function(){
                $(this).hide();
                // 行走的过程就是 背景有移动的过程
                // 背景jquery里面改变比较麻烦
                $(".section6").animate({"backgroundPositionX":"100%"},4000,function(){
                    //当背景动画执行完毕，boy大小复原
                    $(".boy").animate({"height":305,"bottom":116},1000,function(){
                        $(this).animate({"right":500},500,function(){
                            // 门显示出来，模拟打开门的效果
                            $(".door").animate({"opacity":1},200,function(){
                                // 之后girl显示出来，位置大小都发生变化
                                $(".girl").show().animate({"right":350,"height":306,"bottom":116},500,function(){
                                  $(".pop-07").show();
                                  // $(".words-06-a").show();  
                                  $(".next").fadeIn();

                                });
                                
                            })
                        });
                    });
                });
             $(".words-06-a").show().animate({"left":"30%"},2000,"easeOutElastic");  
                $(".pop-06").show();
            });
            });
            }
        // 第六屏到第七屏的滚动
            if(index==6&&nextIndex==7){
                setTimeout(function(){
                   $(".star").animate({"width":120},500,function(){
                    $(".goods-07").show();
                    $(".next").fadeIn();
                   });  
               },1500);
            }
            // 这是第八屏动画
            // $(".beginShoping").mouseenter(function(event){   
            //   $(".btn-08-a").show();
            // })mouseleave(function(event){
            //     $(".btn-08-a").hide();
            // });
            // 鼠标经过显示，鼠标移出隐藏 以后一个盒子鼠标经过显示离开隐藏 我们就可以用hover和toggle混搭
            // hover来替代更简洁
            $(".beginShoping").hover(function(){
                $(".btn-08-a").toggle();
                //toggle 显示和隐藏的切换
            });
            // 大手跟随鼠标移动
            $(document).mousemove(function(event){
                var x=event.pageX-$(".hand-08").width()/2;//获取鼠标在页面中的x坐标,让鼠标位于图片的中间
                var y=event.pageY+10;//获取鼠标在页面中的Y坐标
                // 手的top值不能小于 这个大小 当前屏幕的高度k 减去手的高度 449
                var minY=k-449;
                // 把鼠标在页面中的坐标给 hand 大手 left top
                if(y<minY){
                    y=minY;
                }
                $(".hand-08").css({"left":x,"top":y});

            });
            // 当我们点击 再来一次的时候，分两步进行
            // 1.返回第一屏
            $(".again").click(function(event){
              $.fn.fullpage.moveTo(1);
            // 2.所有的动画会复原 就是我们没看过的样子
            // 核心原理： 让我们的图片（做动画的元素 清楚 行内样式就可以）
            // 所有的动画div盒子 添加move类名
            $("img,.move").attr("style","");
            });

        },
    });//fullpage 方法里面接受json对象形式 navigation否显示项目导航 
});