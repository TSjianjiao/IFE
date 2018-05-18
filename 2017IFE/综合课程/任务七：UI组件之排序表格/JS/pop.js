/**
 * @file 任务六
 *悬浮层开关接口，悬浮层resize接口(有自动居中功能)，出发悬浮层要单独定义
 */
initPop();

/**
 * 初始化悬浮层
 */
function initPop() {
    var cancelBtn = document.getElementById('cancel');
    var popMask = document.getElementById('pop-mask');
    var popTitle = document.getElementById('pop-title');
    // 点击外面关闭悬浮层
    popMask.addEventListener('click', function() {displayPop('hidden');});
    cancelBtn.addEventListener('click', function() {displayPop('hidden');});
    // 点击打开悬浮层 
    // mainBody.addEventListener('click', function() {displayPop('visable');});
    // 拖拽title可以拖动窗口 注册鼠标按下监听器
    // 注意和click区别 这个是按下就会触发 click按下后抬起才会触发
    popTitle.addEventListener('mousedown', function(event){dragFn(event);});
    // 设置大小并注册resize和scorll监听器
    resizePop(300, 300);
    displayPop('hidden');
}
/**
 * 控制悬浮层开关接口
 * @param {string} mode 
 */
function displayPop(mode) {
    var pop = document.getElementById('pop');
    var popMask = document.getElementById('pop-mask');
    if (mode === 'hidden') {
        pop.style.display = 'none';
        popMask.style.display = 'none';
    }
    else if (mode === 'visable') {
        pop.style.display = 'block';
        popMask.style.display = 'block';
    }
    else {
        alert('显示模式设置有误！')
    }
}

/**
 * 修改悬浮窗宽高接口
 * @param {number} width 
 * @param {number} height 
 */
function resizePop(width, height) {
    var pop = document.getElementById('pop');
    pop.style.width = `${width}px`;
    pop.style.height = `${height}px`;
    centerPop(width, height);
    // 注册resize监听器 页面大小改变时调整居中
    window.addEventListener('resize', function() {centerPop(width, height);});
    // 注册scroll监听器 页面滚动时保持悬浮层居中
    // 这个方法谷歌好像不行，但是用CSS的方法position:sticky可以适应比较新的谷歌浏览器
    window.addEventListener('scroll', function(e) {centerPop(width, height, e.pageX, e.pageY);});
}

/**
 * 悬浮层居中函数
 * 滚动居中对谷歌内核的浏览器无效
 * @param {number} width 
 * @param {number} height 
 * @param {number} pageX 
 * @param {number} pageY 
 */
function centerPop(width, height, pageX, pageY) {
    var pop = document.getElementById('pop');
    var html = document.getElementsByTagName('html')[0];
    var body = document.getElementsByTagName('body')[0];
    // 浏览器可视区域的宽度 高度
    var htmlWidth = html.clientWidth;
    var htmlHeight = html.clientHeight;
    // 页面内容的 高度 宽度
    var bodyWidth = body.clientWidth;
    var bodyHeight = body.clientHeight;
    // 根据浏览器宽度 高度计算居中位置
    // 因为如果页面滚动 起始位置就发生了变化 所以需要同时用到可视区域和内容区域
    
    // |```````````````````|----->都是body的区域，除了包含可视区域，还有部分需要滚动才能看到
    // |body               |
    // |                   |
    // |                   |
    // |```````````````````|----->页面滚动到这里，那么scroll事件参数里的pageY就会有个对应的值，实际上就是
    // |        html       |      body的y轴值，最后居中计算的时候left和top加上page值就行了
    // |                   |------>可视区域，也就是不滚动能看到的地方
    // |                   |
    // |```````````````````|
    // |                   |
    // |                   |
    // |                   |
    // |___________________|------>都是body的区域
    // 横过来的原理就不赘述了
    var lefDistance;
    var topDistance;
    // 获取居中top left高度 宽度
    lefDistance = (htmlWidth - width) / 2;
    topDistance = (htmlHeight - height) / 2;
    // 这个判断实际上是有了滚动才执行
    if (pageY !== undefined || pageX !== undefined) {
        // 滚动的话 加上page偏移量
        lefDistance += pageX;
        topDistance += pageY;
    }
    pop.style.left = `${lefDistance}px`;
    pop.style.top = `${topDistance}px`;
}  

/**
 * 拖拽函数 传入点击时的事件参数
 * @param {object} event 
 */
function dragFn(event) {
    var dragFlag = true;
    // 给title注册鼠标离开事件用的
    var popTitle = document.getElementById('pop-title');
    // 获取悬浮层原始位置
    var pop = document.getElementById('pop');
    var orinX = Number(pop.style.left.replace('px', ''));
    var orinY = Number(pop.style.top.replace('px', ''));
    // 获取悬浮层的宽高，之后计算什么时候会出浏览器用
    var popWidth = Number(pop.style.width.replace('px', ''));
    var popHeight = Number(pop.style.height.replace('px', ''));
    // 存储点击时的鼠标坐标
    var clickX = event.clientX;
    var clickY= event.clientY;
    // 注意给document注册move监听器，因为鼠标是相对于整个页面移动的
    // 这里没有用addEventListener 主要是因为 每次点击事件都会注册一个move 用on就不会有多个事件
    document.onmousemove = function (e) {
        var dX = e.clientX - clickX;
        var dY = e.clientY - clickY;
        var left = orinX + dX;
        var top = orinY + dY;
        // 防止悬浮层移动到浏览器外 这里有bug不知道为什么右边会出去一点
        // 如果是demo的方法 固定鼠标与悬浮层之间的距离 倒是不会有问题
        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        if (left + popWidth >= window.innerWidth) {
            left = window.innerWidth - popWidth;
        }
        if (top + popHeight >= window.innerHeight) {
            top = window.innerHeight - popHeight;
        }
        if (dragFlag) {
            pop.style.left = `${left}px`;
            pop.style.top = `${top}px`;
        }
    }
    //鼠标离开或者鼠标按键抬起的时候停止拖动
    popTitle.onmouseup = popTitle.onmouseout = function() {
        dragFlag = false;
    }

}

