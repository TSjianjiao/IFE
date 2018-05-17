/**
 * @file 编码任务2
 */

init();

/**
 * 初始化函数
 */
function init() {
    var buttonList = document.getElementsByTagName('button');
    buttonList[0].addEventListener('click', getLength);
    buttonList[1].addEventListener('click', getStrInThree);
    buttonList[2].addEventListener('click', concatStr);
    buttonList[3].addEventListener('click', getIndexOfAByB);
    buttonList[4].addEventListener('click', getLastIndexOfBByA);
    buttonList[5].addEventListener('click', sliceByNumab);
    buttonList[6].addEventListener('click', getInputRow);
    buttonList[7].addEventListener('click', getStrBySubStr);
    buttonList[8].addEventListener('click', setAllUpperCase);
    buttonList[9].addEventListener('click', setAlltoLowerCase);
    buttonList[10].addEventListener('click', delSpace);
    buttonList[11].addEventListener('click', changeAandB);
}

/**
 * 获取选择的输入框字符串长度
 */
function getLength() {
    var result = document.getElementById('result');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');

    if (radioA.checked) {
        result.innerHTML = inputA.value.length;
    }
    else if (radioB.checked) {
        result.innerHTML = inputB.value.length;
    }
    else {
        alert('请选择按钮')
        return
    }
}

/**
 * 获取字符串中第3个位置的字符
 */
function getStrInThree() {
    var result = document.getElementById('result');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');

    if (radioA.checked) {
        result.innerHTML = inputA.value.charAt(2);
    }
    else if (radioB.checked) {
        result.innerHTML = inputB.value.charAt(2);
    }
    else {
        alert('请选择按钮')
        return
    }
}

/**
 * 两个输入框字符连接在一起
 */
function concatStr() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    result.innerHTML = inputA.value.concat(inputB.value);
}

/**
 * 在A中查找B的内容所在的位置
 */
function getIndexOfAByB() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    result.innerHTML = inputA.value.indexOf(inputB.value);
}

/**
 * 在B中查找最后一次出现的A内容的位置
 */
function getLastIndexOfBByA() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    result.innerHTML = inputB.value.lastIndexOf(inputA.value);
}

/**
 * 根据numa、b作为参数分割所选输入框字符串
 */
function sliceByNumab() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    var numA = Number(document.getElementById('num-a').value);
    var numB = Number(document.getElementById('num-b').value);
    if (radioA.checked) {
        result.innerHTML = inputA.value.slice(numA, numB);
    }
    else if (radioB.checked) {
        result.innerHTML = inputB.value.slice(numA, numB);
    }
    else {
        alert('请选择按钮')
        return
    }
}

/**
 * 获取选定输入框行数
 */
function getInputRow() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    var inputAWidth = inputA.offsetWidth;
    var inputBWidth = inputB.offsetWidth;
    if (radioA.checked) {
        result.innerHTML = Math.ceil((inputA.value.length * 7) / inputAWidth);
    }
    else if (radioB.checked) {
        result.innerHTML = Math.ceil((inputB.value.length * 7) / inputBWidth);
    }
    else {
        alert('请选择按钮')
        return
    }
}

/**
 * 用numa、b的参数substr 截取字符串
 */
function getStrBySubStr() {
    var result = document.getElementById('result');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    var numA = Number(document.getElementById('num-a').value);
    var numB = Number(document.getElementById('num-b').value);
    if (radioA.checked) {
        result.innerHTML = inputA.value.substr(numA, numB);
    }
    else if (radioB.checked) {
        result.innerHTML = inputB.value.substr(numA, numB);
    }
    else {
        alert('请选择按钮')
        return
    }
}

/**
 * 所有输入框内容转为大写
 */
function setAllUpperCase() {
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    inputA.value = inputA.value.toUpperCase();
    inputB.value = inputB.value.toUpperCase();
}

/**
 * 所有输入框内容转为小写
 */
function setAlltoLowerCase() {
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    inputA.value = inputA.value.toLowerCase();
    inputB.value = inputB.value.toLowerCase();
}

/**
 * 删除所有半角空格
 */
function delSpace() {
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    if (radioA.checked) {
        // 以空格为分割标志把字符串分成数组元素 这里的空格打成中文的半角空格好像会有问题
        // '   ab c'--->['', '', '', 'ab', 'c'] 空格会被分割为空字符串，所以可以直接连接
        // 连接完了自然就是没有空格的了
        var inputAList = inputA.value.split(' ');
        for(var i = 1; i < inputAList.length; i++) {
            // 重新组合在一起 注意从1开始计数的 不然[0]位置的字符串 会重复一次
            inputAList[0] = inputAList[0].concat(inputAList[i]);
        }
        // 更新value
        inputA.value = inputAList[0];
    }
    else if (radioB.checked) {
        // 以空格为分割标志把字符串分成数组元素
        var inputBList= inputB.value.split(' ');
        for(var i = 1; i < inputBList.length; i++) {
            // 重新组合在一起 注意从1开始计数的 不然[0]位置的字符串 会重复一次
            inputBList[0] = inputBList[0].concat(inputBList[i]);
        }
        // 更新value
        inputB.value = inputBList[0];  
    }
    else {
        alert('请选择按钮')
        return
    }
}

/**
 * 交换AB内容
 */
function changeAandB() {
    var inputA = document.getElementById('str-a');
    var inputB = document.getElementById('str-b');
    var radioA = document.getElementById('radio-a');
    var radioB = document.getElementById('radio-b');
    if (radioA.checked) {
        var temp = inputA.value;
        inputA.value = inputB.value;
        inputB.value = temp;
    }
    else if (radioB.checked) {
        var temp = inputB.value;
        inputB.value = inputA.value;
        inputA.value = temp;
    }
    else {
        alert('请选择按钮')
        return
    }
}