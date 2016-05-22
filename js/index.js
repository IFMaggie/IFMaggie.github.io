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

    var setTranslateX = function (x) {
        imagesBox.style.transform = 'translateX(' + x + 'px)';
        imagesBox.style.webkitTransform = 'translateX(' + x + 'px)';
    }

    timer = setInterval(function () {
        index++;
        imagesBox.style.transition = 'all 2s ease';
        imagesBox.style.webkitTransition = 'all 2s ease';
        setTranslateX(-index * width);

    }, 2000);

    /* 监听过渡结束事件 */
    itmaggie.transitionEnd(imagesBox, function () {
        if (index >= 9) {
            index = 1;
            imagesBox.style.transition = 'none';
            imagesBox.style.webkitTransition = 'none';
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            imagesBox.style.transition = 'none';
            imagesBox.style.webkitTransition = 'none';
            setTranslateX(-index * width);
        }

    });

    var setCurrPoint = function () {
        var pointIndex = index;
        if (pointIndex >= 9) {
            pointIndex = 1;
        } else if (pointIndex <= 0) {
            pointIndex = 8;
        }
        pointIndex = pointIndex - 1;
        for (var i = 0;i<points.length;i++){
            points.className="";
        }




    }


}




