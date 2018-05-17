/**
 * @file 编码任务1
 */

 init();

 /**
 * 初始化
 */
function init() {
    var buttonList = document.querySelectorAll('button');
    buttonList[0].addEventListener('click', function() {checkNum('either');});
    buttonList[1].addEventListener('click', roundingByB);
    buttonList[2].addEventListener('click', absoluteValue);
    buttonList[3].addEventListener('click', roundingUp);
    buttonList[4].addEventListener('click', roundingDown);
    buttonList[5].addEventListener('click', rounding);
    buttonList[6].addEventListener('click', returnMax);
    buttonList[7].addEventListener('click', returnMin);
}

/**
 * 判断输入框的输入是不是数字 两个模式
 * @param {string} mode
 */
function checkNum(mode) {
    var  numA = document.getElementById('num-a');
    var numB = document.getElementById('num-b');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    // 匹配除了数字\小数点\-\以外的字符 正则表达式不是很熟练..
    var regx = /[^\.\-\d]/gim;
    if(mode === 'both') {
        if (numA.value === '' || numA.value.match(regx)
            || numB.value === '' || numB.value.match(regx)) {
            alert('请输入数字');
            console.log('不是数字！');
            return false
        }
        else {
            return true
        }
    }
    else if (mode === 'either') {
        if (radioA.checked) {
            if (numA.value === '' || numA.value.match(regx)) {
                alert('请输入数字');
                console.log('不是数字！');
                return false
            }
            else {
                return true
            }
        }
        else if (radioB.checked) {
            if (numB.value === '' || numB.value.match(regx)) {
                alert('请输入数字');
                console.log('不是数字！');
                return false
            }
            else {
                return true
            }
        }
        else {
            alert('请先选择按钮');
            return false
        }
    }
    else {
        alert('checkNum() 参数输入有误')
    }

}

/**
 * 把输入A的数字四舍五入为B输入的小数位数
 */
function roundingByB() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    var regx = /[\.\-]/gim;
    // 检查输入是否为数字
    if (!checkNum('both')) {
        return
    }
    // 判断输入B是不是小数或者负数
    if (inputB.value.match(regx)) {
        alert('输入B不能为小数或者负数！');
        return
    }
    // 判断B的输入是不是大于A的小数位数 是就保持原样
    else if (inputA.value.split('.')[1].length < numB) {
        result.innerHTML = numA;
    }
    else {
        // 四舍五入截取小数位
        result.innerHTML = numA.toFixed(numB);
    }
}

/**
 * 将选中的输入框数字取绝对值
 */
function absoluteValue() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    // 检查输入是否为数字
    if (!checkNum('either')) {
        return
    }
    if (radioA.checked) {
        result.innerHTML = Math.abs(numA);
    }
    else if (radioB.checked) {
        result.innerHTML = Math.abs(numB);
    }
    else {
        alert('请先选择按钮');
        return false
    }
}

/**
 * 选中的数字向上舍入
 */
function roundingUp() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    // 检查输入是否为数字
    if (!checkNum('either')) {
        return
    }
    if (radioA.checked) {
        result.innerHTML = Math.ceil(numA);
    }
    else if (radioB.checked) {
        result.innerHTML = Math.ceil(numB);
    }
    else {
        alert('请先选择按钮');
        return false
    }
}


/**
 * 选中的数字向下舍入
 */
function roundingDown() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    // 检查输入是否为数字
    if (!checkNum('either')) {
        return
    }
    if (radioA.checked) {
        result.innerHTML = Math.floor(numA);
    }
    else if (radioB.checked) {
        result.innerHTML = Math.floor(numB);
    }
    else {
        alert('请先选择按钮');
        return
    }
}

/**
 * 四舍五入为最接近的整数
 */
function rounding() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    // 检查输入是否为数字
    if (!checkNum('either')) {
        return
    }
    if (radioA.checked) {
        result.innerHTML = Math.round(numA);
    }
    else if (radioB.checked) {
        result.innerHTML = Math.round(numB);
    }
    else {
        alert('请先选择按钮');
        return
    }
}

/**
 * 返回A、B中最大者
 */
function returnMax() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    // 检查输入是否为数字
    if (!checkNum('both')) {
        return
    }
    result.innerHTML = Math.max(numA, numB);
}

/**
 * 返回A、B中最小者
 */
function returnMin() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('num-a');
    var inputB = document.getElementById('num-b');
    var numA = Number(inputA.value);
    var numB = Number(inputB.value);
    // 检查输入是否为数字
    if (!checkNum('both')) {
        return
    }
    result.innerHTML = Math.min(numA, numB);
}