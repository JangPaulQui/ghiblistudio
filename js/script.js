window.onload = function () {
    //선택자들 선언하기
    let mainBanner = document.querySelector("#mainBanner");
    let banner = document.querySelector(".banner");
    let bannerLi = document.querySelectorAll(".banner>li");
    const pagerBtn = document.querySelectorAll(".pager>li");
    const arrowRight = document.querySelector(".rightBtn");
    const arrowLeft = document.querySelector(".leftBtn");
    var winWidth = window.innerWidth;


    //필요한 기본 변수선언
    //보여지는 배너를 체크 할 변수
    let showBanner = 0;
    let moveX = 0; //얼마나 이동할지 정하는 변수

    //복사전 li의 너비
    liWidth = bannerLi[0].clientWidth
    console.log(liWidth);
    let cloneObj = bannerLi[0].cloneNode(true); //복사
    banner.appendChild(cloneObj); //banner에 붙여넣기
    //복사된 후의 li의 갯수
    bannerLi = document.querySelectorAll(".banner>li");
    console.log(bannerLi);
    let count = bannerLi.length;
    //부모사이즈 수정 (.banner)
    banner.style.width = liWidth * count + "px";
    //자동으로 이동
    let timer;
    function moveSlide() {
        //모든버튼 취소
        for (i = 0; i < pagerBtn.length; i++) {
            pagerBtn[i].classList.remove("active");
        }
        if (showBanner === 3) {
            pagerBtn[0].classList.add("active");
        } else {
            pagerBtn[showBanner].classList.add("active");
        }

        moveX = -liWidth * showBanner;
        banner.style.transition = "0.5s";
        banner.style.transform = `translateX(${moveX}px)`;
    }
    //오른쪽 버튼을 클릭하면 배너가 한개씩 왼쪽으로 이동
    arrowRight.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner++;
        moveSlide();
        if (showBanner === count - 1) {
            setTimeout(function () {
                banner.style.transition = "0s";
                banner.style.transform = `translateX(0)`;
            }, 500)
            showBanner = 0;
        }
    })

    arrowLeft.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner--;
        moveSlide();

        if (showBanner === count - 1) {
            setTimeout(function () {
                banner.style.transition = "0s";
                moveX = (count - 1) * liWidth;
                banner.style.transform = `translateX${-moveX}px)`
            }, 500)
            showBanner = count - 1;
        }
    })

    //pager
    pagerBtn.forEach((n, id) => {
        pagerBtn[id].addEventListener("click", function () {
            showBanner = id;
            moveSlide();
        })
    })

    //자동 슬라이드
    // timer = setInterval(() => {
    //     arrowRight.click();
    // }, 3000)

    //#mainBanner mouseover되면 자동실행 취소

    //mouseout되면 자동실행
    mainBanner.addEventListener("mouseover", function () {
        clearInterval(timer);
    })
    mainBanner.addEventListener("mouseout", function () {
        timer = setInterval(() => {
            arrowRight.click();
        }, 3000)
    })

    window.onresize = function (e) {
        winWidth = window.innerWidth;
        console.log(winWidth)
        liWidth = winWidth;
        banner.style.width = liWidth * count + "px";
        banner.style.transform = `translateX(0)`;
        showBanner=0;
        moveSlide();
    }
    
}