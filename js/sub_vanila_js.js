/* sub_vanila_js.js */ 
window.addEventListener('load',function(){
    {// 주메뉴
        // 재료가져오기
        var gnbMenu = document.querySelectorAll('.gnb>ul>li');              // console.log(gnbMenu);
        var headerWrap = document.querySelector('header .header_wrap');     // console.log(headerWrap);
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
        srchBtn = document.querySelector('#header .btn_srch');              // console.log(srchBtn);
        srchCloseBtn = document.querySelector('#header .btn_srch_close');   // console.log(srchCloseBtn);
        srchWrap = document.querySelector('#header .srch_wrap');            // console.log(srchWrap);

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

    {// topBtn
        btnTop = document.querySelector('#footer .btn_top');             
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
