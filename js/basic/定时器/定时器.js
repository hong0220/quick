/**
 * 打点计时器
 */
function count(start, end) {
    console.log(start++);
    var timer = setInterval(function () {
        if (start <= end) {
            console.log(start++);
        } else {
            clearInterval(timer);
        }
    }, 100);

    // 返回对象带停止定时操作
    return {
        cancel: function () {
            clearInterval(timer);
        }
    };
}