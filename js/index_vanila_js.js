/* index_vanila_js.js */ 
window.addEventListener('load',function(){
    {// 주메뉴
        // 재료가져오기
        var gnbMenu = document.querySelectorAll('.gnb>ul>li');              // console.log(gnbMenu);
        var headerWrap = document.querySelector('#header .header_wrap');     // console.log(headerWrap);
        var headerWrap_origin_h = 70;
        gnbMenu.forEach(function(gnbLi){
            gnbLi.addEventListener('mouseover',function(){
                gnbLi.classList.add("on");
                
                ht = window.getComputedStyle(this.children[1]).height;
                gnbDiv_h = Number(ht.substr(0,ht.length-2));

                headerWrap.animate({
                    height:headerWrap_origin_h + gnbDiv_h + "px"
                },{
                    duration:500,
                    fill:"forwards"
                });
            });

            gnbLi.addEventListener('mouseleave',function(){
                gnbLi.classList.remove("on");
                headerWrap.animate({
                    height : headerWrap_origin_h + "px"
                },{
                    duration:300,
                    fill:"forwards"
                });
                headerWrap.style.height = headerWrap_origin_h + "px";
            });
        });
    }

    {// 검색박스
        var srchBtn = document.querySelector('#header .btn_srch');              // console.log(srchBtn);
        var srchCloseBtn = document.querySelector('#header .btn_srch_close');   // console.log(srchCloseBtn);
        var srchWrap = document.querySelector('#header .srch_wrap');            // console.log(srchWrap);

        srchBtn.addEventListener('click',function(e){
            e.preventDefault();
            srchWrap.classList.add("on");
            document.body.style.overflowY = "hidden";
        });
        srchCloseBtn.addEventListener('click',function(e){
            e.preventDefault();
            srchWrap.classList.remove('on');
            document.body.style.overflowY = "auto";
        });
    }

    {// AutoBanner
        // 재료 수집
        var btnNext = document.querySelector('.btn_next');
        var btnPrev = document.querySelector('.btn_prev');
        var slide = document.querySelectorAll('.slide');
        var slideRoll = document.querySelectorAll('.slide_roll li');
        var btnPlay = document.querySelector('.btn_play');

        var bnnNum = 0;
        var lastNum = document.querySelectorAll('.slide_wrap > li').length -1;

        //next
        btnNext.addEventListener('click',function(){
            bnnNum++;
            if(bnnNum > lastNum){bnnNum = 0;}

            slide.forEach(function(item){
                item.classList.remove('active');
            });
            slide[bnnNum].classList.add('active');

            slideRoll.forEach(function(idx){
                idx.classList.remove('on');
            });
            slideRoll[bnnNum].classList.add('on');
        });//next.click

        //prev
        btnPrev.addEventListener('click',function(){
            bnnNum--;
            if(bnnNum<0){bnnNum = lastNum;}

            slide.forEach(function(item){
                item.classList.remove('active');
            });
            slide[bnnNum].classList.add('active');

            slideRoll.forEach(function(idx){
                idx.classList.remove('on');
            });
            slideRoll[bnnNum].classList.add('on');
        });//prev.click

        function AutoBanner(){
            bnnNum++;
            if(bnnNum > lastNum){bnnNum = 0;}

            slide.forEach(function(item){
                item.classList.remove('active');
            });
            slide[bnnNum].classList.add('active');

            slideRoll.forEach(function(idx){
                idx.classList.remove('on');
            });
            slideRoll[bnnNum].classList.add('on');
        }//function

        var autoBnn = setInterval(AutoBanner,5000);

        //play & pause
        var flag = true;
        btnPlay.addEventListener('click',function(){
            if(flag){
                clearInterval(autoBnn);
                this.classList.add('on');
                flag=false;
            }else{
                autoBnn = setInterval(AutoBanner,5000);
                this.classList.remove('on');
                flag = true;
            }
        });//btnPlay.click

        // 롤링버튼
        slideRoll.forEach(function(item){
            item.addEventListener('click',rollAction);//idx.click
        });//slideRoll.item   

        function rollAction(item){
            curRoll = item.currentTarget;       //클릭 이벤트가 전달된 엘리먼트
            parentRoll = curRoll.parentElement; //연결된 엘리먼트의 부모
            childRoll = parentRoll.children;    //부모 엘리먼트의 자식 엘리먼트들
            curIdx = Array.from(childRoll).indexOf(curRoll);     //연결된 엘리먼트의 인덱스

            slide.forEach(function(item){
                item.classList.remove('active');
            });//slide.item
            slide[curIdx].classList.add('active');

            slideRoll.forEach(function(idx){
                idx.classList.remove('on');
            });//slideRoll.idx
            slideRoll[curIdx].classList.add('on');

            bnnNum = curIdx;
        }//function rollAction

    }

    {// topBtn
        var btnTop = document.querySelector('#footer .btn_top');
        window.addEventListener('scroll',function(){
            var scroll = document.querySelector('html').scrollTop;              
            var screenH = window.outerHeight;                                   
            var documentH = document.querySelector('body').offsetHeight;        
            var footerH = document.querySelector('#footer').offsetHeight;       
            var topBtnLastY = documentH - screenH - footerH - 30;    

            // console.log(btnTop);
            // console.log(scroll);
            // console.log(screenH);
            // console.log(documentH);
            // console.log(footerH);
            // console.log(topBtnLastY);

            //top버튼 위치
            if(scroll <= 0){
                btnTop.classList.remove("on","ab");    // 안보임
            }else if(0 < scroll && scroll < topBtnLastY){    
                btnTop.classList.remove("ab");
                btnTop.classList.add("on");        // 스크롤 따라다님 : footer 기준으로 30px 위의 위치에 정착할 때 scrollTop = topBtnLastY
            }else if(topBtnLastY <= scroll){ // footer 위에 고정
                btnTop.classList.add("ab");
            }
        });

        btnTop.addEventListener('click',function(e){
            e.preventDefault();
            window.scroll({left:0,top:0,behavior:'smooth'});
        });
    }
});
