/**
 * Created by Maggie1 on 2016/5/16.
 */
window.itmaggie = {};
itmaggie.transitionEnd = function (objDom,callback) {
    if (typeof objDom !='object'){
        return false;
    }


    objDom.addEventListener('transitionEnd',function () {
        callback && callback();
    });

    objDom.addEventListener('webkitTransitionEnd',function () {
        callback && callback();
    });
}