window.addEventListener('load', function() {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // 移动距离，小圆圈的索引号乘图片宽度
    var focuswidth = focus.offsetWidth;

    // 鼠标自动显隐
    // 鼠标经过focus显示
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 关闭并清除定时器
        clearInterval(timer);
        timer = null;
    })
    // 鼠标离开focus隐藏
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 开启定时器
        timer = setInterval(function() {
            // 手动调用右侧按钮事件
            arrow_r.click();
        }, 3000);
    })

    // 动态生成小圆圈
    // 获取ul下所有子节点
    for(var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        // 将li插入至ol中
        var li = document.createElement('li');
        // 给li生成index索引号
        li.setAttribute('index', i);
        // 将li插入ol中
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for(var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            
            // 点击小圆圈移动图片
            // 获取点击小圆圈的索引号
            var index = this.getAttribute('index');
            // 将index值赋给num
            num = index;
            // 将index赋值给circle
            circle = index;
            // 调用动画
            slow(ul, -index * focuswidth);
        })
    }
    ol.children[0].className = 'current';

    // 克隆第一张图片，放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 左右侧箭头无缝滚动
    var num = 0;
    // 控制小圆圈播放
    var circle = 0;
    arrow_r.addEventListener('click', function() {
        // 如果走到了最后一张复制的图片，此时将ul快速复原到left为0的状态
        if(num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        slow(ul, -num * focuswidth);
        // 控制小圆圈一起变化
        circle++;
        // 如果circle走到了最后一面需要复原
        if(circle == ul.children.length - 1) {
            circle = 0;
        }
        circleChange();
    })
    arrow_l.addEventListener('click', function() {
        // 如果走到了最后一张复制的图片，此时将ul快速复原到left为0的状态
        if(num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focuswidth + 'px';
        }
        num--;
        slow(ul, -num * focuswidth);
        // 控制小圆圈一起变化
        circle--;
        // 如果circle走到了最后一面需要复原
        if(circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    })

    // 自动播放轮播图
    var timer = setInterval(function() {
        // 手动调用右侧按钮事件
        arrow_r.click();
    }, 3000);

    function circleChange() {
        // 清除其他小圆圈current类名
        for(var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
})