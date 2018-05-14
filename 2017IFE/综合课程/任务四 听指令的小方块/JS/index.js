/**
 * @file 任务四代码
 */
var commandInput = document.getElementById('command');
var actionBtn = document.getElementById('actionBtn');
// 移动目标对象
var aim;
// 头部方位标志位
var dirFlag = 'forward';
// 初始位置坐标
// 这里的坐标其实是代表第几行（x）第几列（y）
var initX = 6;
var initY = 6;

// 初始化
init(initX, initY, 'forward');
// 注册点击事件
actionBtn.onclick = gameAction;

/**
 * 游戏运行函数
 */
function gameAction() {
    var command = commandInput.value;
    if (command === '') {
        alert('请输入命令');
    }
    else if (command === 'GO') {
        forwardAction();
    }
    else if (command === 'TUN LEF' || command === 'TUN RIG' || command === 'TUN BAC') {
        turnToAction(command);
    }
    else {
        alert('请输入正确命令,注意空格和大小写');
    }
}

/**
 * 初始化棋盘
 * @param {number} x
 * @param {number} y
 * @param {string} dir
 */
function init(x, y, dir) {
    dirFlag = dir;
    // 保存目标对象
    aim = creatTarget(dir);
    var position = getAim(x, y);
    position.appendChild(aim);
}

/**
 * 制造目标方块
 */
function creatTarget(dir) {
    // 目标小方块结构
    // <div class="target">
    //     <div class="head"></div>
    //     <div class="body"></div>
    // </div>
    var targetDiv = document.createElement('div');
    var headDiv = document.createElement('div');
    var bodyDiv = document.createElement('div');
    targetDiv.setAttribute('class', 'target');
    // 不同方向
    headDiv.setAttribute('class', `head-${dir}`);
    bodyDiv.setAttribute('class', `body-${dir}`);
    targetDiv.appendChild(headDiv);
    targetDiv.appendChild(bodyDiv);
    return targetDiv
}

/**
 * 查找给定位置的td
 * @param {number} row
 * @param {number} column
 */
function getAim(row, column) {
    // 因为html结构的原因，实际查找对于行列的时候，要多加一
    var x = row + 1;
    var y = column + 1
    if ( x > 11 || y > 11 || x <= 1 || y <= 1) {
        alert('超出边界！');
        return false
    }
    else {
        // 使用选择器，找到对应位置的td，相当于 tr:nth-of-type(x) td:nth-of-type(y) 选择器
        var targetObj = document.querySelector(`tr:nth-of-type(${x}) td:nth-of-type(${y})`);
        return targetObj
    }

}

/**
 * 前进函数
 */
function forwardAction() {
    var currentX = initX;
    var currentY = initY;
    var currentDir = dirFlag;
    aim.parentElement.removeChild(aim);
    console.log(currentDir);
    if (currentDir === 'left') {
        currentY--;
    }
    else if (currentDir === 'right') {
        currentY++;
    }
    else if (currentDir === 'forward') {
        currentX--;
    }
    else {
        currentX++;
    }
    // 更新新的位置
    console.log(currentX);
    var targetObj = getAim(currentX, currentY);
    // 合法位置的时候才更新
    if (targetObj) {
        // 更新坐标
        initX = currentX;
        initY = currentY;
    }
    else {
        targetObj = getAim(initX, initY);
    }
    // 更新目标的位置
    targetObj.appendChild(aim);
}

/**
 * 目标转向函数
 * @param {string} command 
 */
function turnToAction(command) {
    var currentDir = dirFlag;
    if (currentDir === 'forward') {
        if (command === 'TUN LEF') {
            currentDir = 'left';
        }
        else if (command === 'TUN RIG') {
            currentDir = 'right';
        }
        else {
            currentDir = 'backward';
        }
    }
    else if (currentDir === 'backward') {
        if (command === 'TUN LEF') {
            currentDir = 'right';
        }
        else if (command === 'TUN RIG') {
            currentDir = 'left';
        }
        else {
            currentDir = 'forward';
        }
    }
    else if (currentDir === 'left') {
        if (command === 'TUN LEF') {
            currentDir = 'backward';
        }
        else if (command === 'TUN RIG') {
            currentDir = 'forward'
        }
        else {
            currentDir = 'right';
        }
    }
    else if (currentDir === 'right') {
        if (command === 'TUN LEF') {
            currentDir = 'forward';
        }
        else if (command === 'TUN RIG') {
            currentDir = 'backward';
        }
        else {
            currentDir = 'left';
        }
    }
    else 
    {
        alert('方向有误');
    }
    // 更新标志位
    dirFlag = currentDir;
    // 更新目标方向
    aim.children[0].setAttribute('class', `head-${currentDir}`);
    aim.children[1].setAttribute('class', `body-${currentDir}`);
}
