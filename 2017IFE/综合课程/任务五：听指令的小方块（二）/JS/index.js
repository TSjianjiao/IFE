/**
 * @file 任务四代码
 */
var commandInput = document.getElementById('command');
var actionBtn = document.getElementById('actionBtn');
var checkerBoard = document.getElementById('checker-board');
// 移动目标对象
var aim;
// 头部方位标志位 这个标志位按照头朝上为基准
var dirFlag = 'forward';
// 目标移动的偏移量，这个值是>试验<出来的，不是直接移动的目标长宽
const X_BIAS = 45;
const Y_BIAS = 51;

// 初始位置坐标
var initX = 5;
var initY = 5;

// 初始化
init(initX, initY);
// 注册点击事件
actionBtn.onclick = gameAction;

/**
 * 游戏运行函数
 */
function gameAction() {
    var command = commandInput.value;
    // 使用else if可以只判断一次，多个if会每个都判断
    if (command === '') {
        alert('请输入命令');
    }
    else if (command === 'GO') {
        goAction();
    }
    else if (command === 'TUN LEF' || command === 'TUN RIG' || command === 'TUN BAC') {
        turnToAction(command);
    }
    else if (command === 'TRA LEF' || command === 'TRA TOP' 
            || command === 'TRA RIG' || command === 'TRA BOT') {
        traAction(command);
    }
    else if (command === 'MOV LEF' || command === 'MOV TOP' 
            || command === 'MOV RIG' || command === 'MOV BOT') {
        moveToAction(command);
    }
    else {
        alert('请输入正确命令,注意空格和大小写');
    }
}
/**
 * 棋盘初始化
 * @param {number} x 
 * @param {number} y 
 */
function init(x, y) {
    var position = setPosition(x, y);
    if (position) {
        // 存储目标对象
        aim = creatBlock();
        var left = position[0][0];
        var top = position[0][1];
        aim.style.left = `${left}px`;
        aim.style.top = `${top}px`;
    }
}

/**
 * 制造目标方块
 */
function creatBlock() {
    // <div className="target">
    //     <div className="head"></div>
    //     <div className="body"></div>
    // </div>
    var divObj = document.createElement('div');
    var headObj = document.createElement('div');
    var bodyObj = document.createElement('div');
    divObj.setAttribute('class', 'target');
    headObj.setAttribute('class', 'head');
    bodyObj.setAttribute('class', 'body');
    divObj.appendChild(headObj);
    divObj.appendChild(bodyObj);
    checkerBoard.appendChild(divObj);
    return divObj
}

/**
 * 获取坐标函数(获取的是相对位置坐标)
 * 注意返回的是一个包含坐标数组的数组
 * @param {number} x 
 * @param {number} y 
 */
function setPosition(x, y) {
    var currentX;
    var currentY;
    var positinList = [];
    if (x > 10 || x === 0 || y > 10 || y === 0) {
        return false
    }
    else if (x === 1) {
        currentX = 47;
    }
    else {
        currentX = 47 + (x - 1) * X_BIAS;
    }
    currentY = y * Y_BIAS;
    positinList.push([currentX,currentY]);
    return positinList
}

/**
 * 前进函数 相对于自身
 */
function goAction() {
    var currentDir = dirFlag;
    // 从初始位置开始
    var currentX = initX;
    var currentY = initY;
    var left;
    var top;
    var position;
    if (currentDir === 'forward') {
        currentY--;
    }
    else if (currentDir === 'backward') {
        currentY++;
    }
    else if (currentDir === 'left') {
        currentX--;
    }
    else {
        currentX++;
    }
    position = setPosition(currentX, currentY);
    if (position) {
        left = position[0][0];
        top = position[0][1];
        // 更新坐标
        initX = currentX;
        initY = currentY;
        // 更新目标位置
        aim.style.left = `${left}px`;
        aim.style.top = `${top}px`;
    }
    else {
        alert("超出边界！");
    }
}

/**
 * 转动目标函数 相对于自身
 * @param {string} command 
 */
function turnToAction(command) {
    var currentDir = dirFlag; 
        // 下面的判断值为了更新头的位置，方便移动函数判断前进方向
    if (currentDir === 'forward') {
        if (command === 'TUN LEF') {
            aim.style.animationName = 'up-left';
            currentDir = 'left';
        }
        else if (command === 'TUN RIG') {
            aim.style.animationName = 'up-right';
            currentDir = 'right';
        }
        else {
            // 旋转180度
            aim.style.animationName = 'up-right';
            aim.style.animationName = 'right-buttom';
            currentDir = 'backward';
        }
    }
    else if (currentDir === 'backward') {
        if (command === 'TUN LEF') {
            aim.style.animationName = 'buttom-right';
            currentDir = 'right';
        }
        else if (command === 'TUN RIG') {
            aim.style.animationName = 'buttom-left';
            currentDir = 'left';
        }
        else {
            // 旋转180度
            aim.style.animationName = 'buttom-left';
            aim.style.animationName = 'left-up';
            currentDir = 'forward';
        }
    }
    else if (currentDir === 'left') {
        if (command === 'TUN LEF') {
            aim.style.animationName = 'left-buttom';
            currentDir = 'backward';
        }
        else if (command === 'TUN RIG') {
            aim.style.animationName = 'left-up';
            currentDir = 'forward';
        }
        else {
            // 旋转180度
            aim.style.animationName = 'left-up';
            aim.style.animationName = 'up-right';
            currentDir = 'right';
        }
    }
    else {
        if (command === 'TUN LEF') {
            aim.style.animationName = 'right-up';
            currentDir = 'forward';
        }
        else if (command === 'TUN RIG') {
            aim.style.animationName = 'right-buttom';
            currentDir = 'backward';
        }
        else {
            // 旋转180度
            aim.style.animationName = 'right-buttom';
            aim.style.animationName = 'buttom-left';
            currentDir = 'left';
        }
    }
    // 更新方向标志
    dirFlag = currentDir;
}

/**
 * 目标移动函数 相对于屏幕
 * @param {string} command 
 */
function traAction(command) {
    // 从初始位置开始
    var currentX = initX;
    var currentY = initY;
    var left;
    var top;
    var position;

    if (command === 'TRA LEF') {
        currentX--;
    }
    else if (command === 'TRA TOP') {
        currentY--;
    }
    else if (command === 'TRA RIG') {
        currentX++;
    }
    else {
        currentY++;
    }
    position = setPosition(currentX, currentY);
    if (position) {
        left = position[0][0];
        top = position[0][1];
        // 更新坐标
        initX = currentX;
        initY = currentY;
        // 更新目标位置
        aim.style.left = `${left}px`;
        aim.style.top = `${top}px`;
    }
    else {
        alert("超出边界！");
    }
}

/**
 * 目标移动并转向函数 相对于屏幕
 * @param {string} command 
 */
function moveToAction(command) {
    // 从初始位置开始
    var currentX = initX;
    var currentY = initY;
    var left;
    var top;
    var position;
    var currentDir = dirFlag;
    if (command === 'MOV LEF') {
        if (currentDir === 'forward') {
            aim.style.animationName = 'up-left';
        }
        else if (currentDir === 'backward') {
            aim.style.animationName = 'buttom-left';
        }
        else if (currentDir === 'right'){
            aim.style.animationName = 'right-buttom';
            aim.style.animationName = 'buttom-left';
        }
        currentDir = 'left';
    }
    else if (command === 'MOV TOP') {
        if (currentDir === 'backward') {
            aim.style.animationName = 'buttom-left';
            aim.style.animationName = 'left-up';
        }
        else if (currentDir === 'left') {
            aim.style.animationName = 'left-up';
        }
        else if (currentDir === 'right'){
            aim.style.animationName = 'right-up';
        }
        currentDir = 'forward';
    }
    else if (command === 'MOV RIG') {
        if (currentDir === 'forward') {
            aim.style.animationName = 'up-right';
        }
        else if (currentDir === 'backward') {
            aim.style.animationName = 'buttom-right';
        }
        else if (currentDir === 'left'){
            aim.style.animationName = 'left-up';
            aim.style.animationName = 'up-right';
        }
        currentDir = 'right';
    }
    else {
        if (currentDir === 'forward') {
            aim.style.animationName = 'up-right';
            aim.style.animationName = 'right-buttom';
        }
        else if (currentDir === 'left') {
            aim.style.animationName = 'left-buttom';
        }
        else if (currentDir === 'right'){
            aim.style.animationName = 'right-buttom';
        }
        currentDir = 'backward';
    }
    // 更新方向标志
    dirFlag = currentDir;
    // 朝着当前方向前进,等到转向的动画完成后再开始前进函数,稍微比1秒长点，程序执行需要一点时间
    setTimeout(goAction, 1100);
}