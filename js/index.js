/* 加载完成 */
window.onload = function () {
    /* 执行方法块 */
    search();
    banner();
}
/* 搜索 */
function search() {
    /* 需求
     * 随着页面的滚动，颜色不断的加深
     * 滚动到一定距离之后 颜色不变
     */
    /* 获取盒子 */
    var search = document.getElementsByClassName("jd_header_box")[0];
    var banner = document.getElementsByClassName("jd_banner")[0];
    var h = banner.offsetHeight;
    /* 监听页面的滚动 */
    window.onscroll = function () {
        /* 取到离顶部的距离 */
        var top = document.body.scrollTop;
        var opacity = 0;
        if (h > top) {
            opacity = 0.85 * top / h;
        } else {
            opacity = 0.85;
        }

        search.style.background = "rgba(201, 21, 35," + opacity + ")";
    }
}

/* 轮播图 */
function banner() {
    /*
     * 自己按一定的时间向右滚动
     * 点也会对应的做改变
     * 跟随手指做滑动
     * 滑动到不足三分之一的时候，需要吸附回去
     * 滑动超过三分之一的时候 滑过去
     */
    var banner = document.getElementsByClassName("jd_banner")[0];
    /* 取到轮播图宽度 */
    var width = banner.offsetWidth;
    var imagesBox = banner.getElementsByTagName("ul")[0];
    var pointBox = banner.getElementsByTagName("ul")[1];
    var points = pointBox.getElementsByTagName("li");

    var index = 1;
    var timer;

    /* 定位 */
    var setTranslateX = function (x) {
        imagesBox.style.transform = 'translateX(' + x + 'px)';
        imagesBox.style.webkitTransform = 'translateX(' + x + 'px)';
    }

    /* 加过渡 */
    var addTransition = function () {
        imagesBox.style.transition = 'all .2s ease';
        imagesBox.style.webkitTransition = 'all .2s ease';
    }

    /* 清除过渡 */
    var removeTransition = function () {
        imagesBox.style.transition = 'none';
        imagesBox.style.webkitTransition = 'none';
    }

    timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);

    }, 2000);

    /* 监听过渡结束事件 */
    itmaggie.transitionEnd(imagesBox, function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setCurrPoint();

    });

    var setCurrPoint = function () {
        var pointIndex = index;
        if (pointIndex >= 9) {
            pointIndex = 1;
        } else if (pointIndex <= 0) {
            pointIndex = 8;
        }
        pointIndex = pointIndex - 1;
        for (var i = 0; i < points.length; i++) {
            points[i].className = "";
        }

        points[pointIndex].className = 'now';
    }

    /* 跟随手指做滑动 */
    var startX = 0;
    /* 起始坐标值 */
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    imagesBox.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    imagesBox.addEventListener("touchmove", function (e) {
        clearInterval(timer);
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-index * width + distanceX);
        isMove = true;
    });
    window.addEventListener("touchend", function () {
        if (Math.abs(distanceX) > 1 / 3 * width && isMove) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            addTransition();
            setTranslateX(-index * width);
        } else {
            addTransition();
            setTranslateX(-index * width);
        }
    });

    timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);

    }, 2000);
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;

}





