/* index_jquery.js*/
$(document).ready(function(){
    {// 주메뉴
        $("nav>ul>li>a").bind("mouseover focus", function(){
            var ht = $(this).next().height();    //nav>ul>li>div의 높이

            $(".header_wrap").stop().animate({"height":70+ht},500,"linear");

            $("nav>ul>li>div").css("display","none");
            $(this).next().css("display","block");
        });
        $("nav").bind("mouseleave blur", function(){
            $(".header_wrap").stop().animate({"height":"70px"},300,"linear");
            $("nav>ul>li>div").css("display","none");
            $("nav>ul>li").removeClass("on");
        });
    }// 주메뉴

    {// 검색박스
        $(".btn_srch > a").click(function(){
            $("div.srch_wrap").removeClss("on");
            $(this).addClss("on");
        });
        $("a.btn_srch_close").click(function(){
            $("div.srch_wrap").removeClss("on");
            $(".btn_srch > a").addClss("on");
        });
    }// 검색박스

    {// AutoBanner
        var $bnnNum = 0;
        var $lastNum = $("ul.slide_wrap>li").size()-1; //3ea -1 : 2

        // console.log("banner number :" + $bnnNum);
        // console.log("last banner :" + $lastNum);

        $("a.btn_next").click (function(){
            $bnnNum++;
            if($bnnNum>$lastNum) {$bnnNum=0;}

            $(".slide").removeClass("active");
            $(".slide").eq($bnnNum).addClass("active");

            $(".slide_roll li").removeClass("on");
            $(".slide_roll li").eq($bnnNum).addClass("on");
        });// next
        
        $("a.btn_prev").click (function(){
            $bnnNum--;
            if($bnnNum<0) {$bnnNum=$lastNum;}

            $(".slide").removeClass("active");
            $(".slide").eq($bnnNum).addClass("active");
            
            $(".slide_roll li").removeClass("on");
            $(".slide_roll li").eq($bnnNum).addClass("on");
        });//prev

        function AutoBanner() {
            $bnnNum--;
            if($bnnNum<0) {$bnnNum=$lastNum;}

            $(".slide").removeClass("active");
            $(".slide").eq($bnnNum).addClass("active");
            
            $(".slide_roll li").removeClass("on");
            $(".slide_roll li").eq($bnnNum).addClass("on");
        }// AutoBanner
        var $autoBnn = setInterval(AutoBanner,5000);

        //play&pause
        var flag = true;        //재생
        $("a.btn_play").click(function(){
            if(flag){ //pause
                clearInterval($autoBnn);
                $(this).addClass("on");
                flag=false;
            }else{ //play
                $autoBnn = setInterval(autoBanner,5000);
                $(this).removeClass("on");
                flag=true;
            }
        });

        //롤링버튼
        $(".slide_roll li").click(function(){
            $bnnNum = $(".slide_roll li").index(this);
            console.log("click banner : "+$bnnNum);

            $(".slide_roll li").children("a").css("background","#ccc");
            $(this).children("a").css("background","#fff");

            $("ul.slide_wrap li").removeClass("active");
            $("ul.slide_wrap li").eq($bnnNum).addClass("active");
        });

    }// AutoBanner

    {// topBtn
        $(window).scroll(function(){
            var scroll = $(this).scrollTop(),
            documentH = $(document).height(),
            screenH = $(this).height();
            footerH = $("#footer").height(),
            topBtnLastY = documentH - screenH - footerH - 30;

            /*
            documentH: 문서 세로 크기 :4030px
            footerH : footer 높이 : 185px
            screenH : window 높이 : 1107px(작성기준, 클라이언트에 따라)
            topBtnLastY = documentH - screenH - footerH - 30 = 4030 - (1107) - 185 - 30 = 2738px

            console.log("totalH : "+topBtnLastY);
            console.log(scroll);
            console.log(screenH);
            */

            //top버튼 위치
            if(scroll <= 100){          
                $("a.btn_top").stop().animate({"opacity":"0"},500,"linear");        // 안보임 : 100:스크롤을 약간 밑으로 내렸을 때
            }else if(scroll > 100 && scroll <= topBtnLastY){    
                $("a.btn_top").stop().animate({"opacity":"1"},500,"linear");        // 스크롤 따라다님 : footer 기준으로 30px 위의 위치에 정착할 때 scrollTop = topBtnLastY
                $("a.btn_top").css({"position":"fixed","bottom":"30px"});
            }else if(scroll > topBtnLastY){ // footer 위에 고정
                $("a.btn_top").css({"position":"absolute","bottom":footerH+30+"px"});
            }
        });// .scroll

        $("a.btn_top").click(function(){
            $("html, body").stop().animate({"scrollTop":"0"},1400,"swing");     // 클릭했을 때 위로 이동
        });// .click
      
    }
});