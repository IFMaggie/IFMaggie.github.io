/**
 * Created by Maggie1 on 2016/5/16.
 */
window.itmaggie = {};
itmaggie.transitionEnd = function (objDom, callback) {
    if (typeof objDom != 'object') {
        return false;
    }

    objDom.addEventListener('transitionEnd', function () {
        callback && callback();
    });

    objDom.addEventListener('webkitTransitionEnd', function () {
        callback && callback();
    });
}
/* tap事件封装 */
/* 响应时间在150毫秒内 */
itmaggie.tap = function (objDom, callback) {
    if (typeof objDom != 'object') {
        return false;
    }


    var isMove = false;
    var startTime = 0;
    objDom.addEventListener("touchstart", function (e) {
        startTime = Date.now();
    });

    objDom.addEventListener("touchmove", function (e) {
        isMove = true;
    });
    objDom.addEventListener("touchend", function (e) {

        if (!isMove && (Date.now() - startTime ) < 150) {
            callback && callback(e);
        }
        isMove = false;
        startTime = 0;
    });


}


