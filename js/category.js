window.onload = function () {
    leftSwipe();
    rightSwipe();
}

/* 左侧滑动 */

function leftSwipe() {
    /*
     * 1 滑动
     * 2 滑动超过一定距离 吸附
     * 3 点击后 当前分类滑动到最顶端
     *  同时改变当前的选中元素
     * 4 在点击下面的元素的时候不需要定位
     */

    var parentBox = document.getElementsByClassName("jd_category_left")[0];
    var childBox = parentBox.getElementsByTagName("ul")[0];


    /* 父盒子高度 */
    var parentH = parentBox.offsetHeight;
    /* 子盒子高度 */
    var childH = childBox.offsetHeight;

    /* 最大定位区间 */
    var maxPosition = 0;
    /* 最小定位区间 */
    var minPosition = -(childH - parentH);

    /* 缓冲区间 */
    var distanceH = 150;

    var maxSwipe = maxPosition + distanceH;
    var minSwipe = minPosition - distanceH;

    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currY = 0;

    /* 加过渡 */
    var addTransition = function () {
        childBox.style.transition = 'all .2s ease';
        childBox.style.webkitTransition = 'all .2s ease';
    }

    /* 清除过渡 */
    var removeTransition = function () {
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    }

    /* 定位 */
    var setTranslateY = function (y) {
        childBox.style.transform = 'translateY(' + y + 'px)';
        childBox.style.webkitTransform = 'translateY(' + y + 'px)';
    }

    childBox.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });

    childBox.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;


        if ((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe) {
            removeTransition();
            setTranslateY(currY + distanceY);
        }

    });
    window.addEventListener("touchend", function () {
        currY = currY + distanceY;
        if (currY > maxPosition) {
            currY = maxPosition;
            addTransition();
            setTranslateY(currY);
        } else if (currY < minPosition) {
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }
        /* 重置参数 */
        startY = 0;
        moveY = 0;
        distanceY = 0;

    });
    var lisDom = childBox.children;
    itmaggie.tap(childBox, function (e) {
        var liDom = e.target.parentNode;
        for (var i = 0; i < lisDom.length; i++) {
            lisDom[i].className = "";
            lisDom[i].index = i;
        }
        liDom.className = "now";
        var position = -liDom.index * 50;
        if (position < maxPosition && position > minPosition) {
            currY = position;
            addTransition();
            setTranslateY(currY);
        } else {
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }
    });
}


function rightSwipe() {
    var parentBox = document.getElementsByClassName("jd_category_right")[0];
    var childBox = parentBox.getElementsByTagName("div")[0];

    var parentH = parentBox.offsetHeight;
    var childH = childBox.offsetHeight;


    /* 最大定位区间 */
    var maxPosition = 0;
    /* 最小定位区间 */
    var minPosition = -(childH - parentH);

    /* 加过渡 */
    var addTransition = function () {
        childBox.style.transition = 'all .2s ease';
        childBox.style.webkitTransition = 'all .2s ease';
    }

    /* 清除过渡 */
    var removeTransition = function () {
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    }

    /* 定位 */
    var setTranslateY = function (y) {
        childBox.style.transform = 'translateY(' + y + 'px)';
        childBox.style.webkitTransform = 'translateY(' + y + 'px)';
    }


    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currY = 0;

    childBox.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        
        if ((currY + distanceY) < maxPosition && (currY + distanceY) > minPosition) {
            removeTransition();
            setTranslateY(currY + distanceY);
        }

    });

    childBox.addEventListener("touchend", function () {
        currY = currY + distanceY;
        if (currY > maxPosition) {
            currY = maxPosition;
            addTransition();
            setTranslateY(currY);
        } else if (currY < minPosition) {
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }
        /* 重置参数 */
        startY = 0;
        moveY = 0;
        distanceY = 0;

    });

}