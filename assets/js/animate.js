// 简单匀速运动动画
function uniform(obj, targit, callback) {
    // 给不同元素添加不同定时器
    // 清除定时器，让元素只有一个定时器进行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if(obj.offsetLeft == targit) {
            // 停止动画
            clearInterval(obj.timer);
            if(callback) {
                // 调用函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + 1 + 'px';
    }, 15);
}
// 缓动动画
function slow(obj, targit, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 计算步长值
        var distance = (targit - obj.offsetLeft) / 10;
        // 将步长值储存为整数
        // 正值向大，负值向小
        distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance);
        if(obj.offsetLeft == targit) {
            // 停止动画
            clearInterval(obj.timer);
            if(callback) {
                // 调用函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + distance + 'px';
    }, 15)
}