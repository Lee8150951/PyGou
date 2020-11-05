var tab_list = document.querySelector('.tab_list');
var as = tab_list.querySelectorAll('a');
var tab_content = document.querySelector('.tab_content');
var items = tab_content.querySelectorAll('.tab_list_item');
// for循环绑定事件
for(var i = 0; i < as.length; i++) {
    // 给所有a设置index索引值
    as[i].setAttribute("index", i);
    as[i].onclick = function() {
        // 选项卡中点击某一个a后，修改其样式（排他思想）
        for(var i = 0; i < as.length; i++) {
            // 排除所有元素
            as[i].className = '';
        }
        // 给点级元素增加类名
        this.className = 'style_red';
        // 内容显示模块
        var index = this.getAttribute('index');
        // 排他思想，隐藏所有组
        for(var i = 0; i < items.length; i++) {
            items[i].style.display = '';
        }
        // 设置对应item为显示
        items[index].style.display = 'block';
    }
}