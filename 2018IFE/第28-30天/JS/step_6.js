/**
 * @file 最终代码
 */

//  判断是不是中文输入法标志位
var isChinese = false;
// 邮箱后缀
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var emailInput = document.getElementById('email-input');
var wrapper = document.getElementsByClassName('wrapper')[0];
var clearBtn = document.getElementById('clear-all');
// 全清按钮默认隐藏
clearBtn.style.display = 'none';
// 默认隐藏提示
setOff();
// 页面加载完就有焦点
window.onload = function (e) {
    emailInput.focus();
};
// 输入监听 keypress在火狐和谷歌上面不一样，谷歌不会响应backspace，火狐要响应
emailInput.addEventListener('keydown', function (e) {
    // 除了上下键确认esc键
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter' && e.key !== 'Escape') {
        if (isChinese === false) {
            // 增加延时，等待input更新
            setTimeout(function () {
                getInput(e.target.value)
            }, 0);
        }
    }
});
// 监听键盘选择提示
emailInput.addEventListener('keydown', function (e){
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter' || e.key == 'Escape') {
        // 选择提示操作
        selectOp(e.key);
    }
});
// 输入之前有变化，是中文输入法
emailInput.addEventListener('compositionstart', function (e) {
    isChinese = true;
});
// 输入结束 传递data
emailInput.addEventListener('compositionend', function (e) {
    isChinese = false;
    setTimeout(function () {
        getInput(e.data)
    }, 0);
});
// 注册点击事件，获取li内容
wrapper.addEventListener('click', function (e){
    // 如果点击的是li标签
    if (e.target.nodeName === 'LI') {
        // 解码输入
        text = decodeHtml(e.target.innerText);
        slecteNotice(text);
    }
});
// 优先显示鼠标选择的目标
wrapper.addEventListener('mouseover', function (e) {
    if (e.target.nodeName === 'LI') {
        // 清除选中样式
        var ulObj = document.getElementById('email-sug-wrapper');
        for (x of ulObj.children) {
            x.removeAttribute('class');
        }
    }
});
/**
 * 获取输入
 * @param {string} input 
 */
function getInput(input) {
    // 去除前后空格
    var inputData = input.trim();
    // 编码用户输入
    inputData = codeHtml(inputData);
    // 控制提示框显示
    noticeSwitch(inputData);
    // 生成提示数组
    var noticeList = createNotice(inputData);
    // 添加提示进列表
    addNotice(noticeList);

}

/**
 * 生成提示内容
 * @param {string} input 
 */
function createNotice(input) {
    var noticeList = [];
    var index = input.indexOf('@')
    var afterInput;
    var preInput
    // 如果输入包含@
    if ( index !== -1) {
        // 用来组合提示
        preInput = input.slice(0, index);
        // 用来输入和提示匹配
        afterInput = input.slice(index+1);
    }
    else {
        preInput = input;
        afterInput = '';
    }
    // 遍历后缀数组
    for (x of postfixList) {
        // afterInput存在就是有@符号时 且后缀匹配在第一个位置时
        if (x.indexOf(afterInput) !== -1 && x.indexOf(afterInput) === 0) {
            noticeList.push(`${preInput}@${x}`);
        }
    }

    // 如果没有匹配的 返回全部
    if (noticeList.length === 0) {
        for (x of postfixList) {
            noticeList.push(`${preInput}@${x}`);
        }
    }
    return noticeList
}
/**
 * 将提示内容添加到列表中
 * @param {array} data
 */
function addNotice(data) {
    // 先清空列表
    var ulObj = document.getElementById('email-sug-wrapper');
    ulObj.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var liObj = document.createElement('li');
        if (!i) {
            liObj.setAttribute('class', 'selected')
        }
        liObj.innerHTML = data[i];
        ulObj.appendChild(liObj);
    }
}

/**
 * 控制提示显示/隐藏
 * @param {string} input 
 */
function noticeSwitch(input) {
    if (input === '') {
        clearBtn.style.display = 'none';
        setOff();
    } else {
        setOn();
        // 全部清除按钮
        clearBtn.style.display = 'block';
        clearAll();
    }
}

/**
 * 提示列表隐藏
 */
function setOff() {
    var ulObj = document.getElementById('email-sug-wrapper');
    ulObj.style.display = 'none';
}

/**
 * 提示列表显示
 */
function setOn() {
    var ulObj = document.getElementById('email-sug-wrapper');
    ulObj.style.display = 'block';
}

/**
 * 用户选择提示
 * @param {string} text
 */
function slecteNotice(text) {
    // 更新提示
    emailInput.value = text;
    // 设置焦点
    emailInput.focus();
    // 隐藏提示
    setOff();
}

// https://www.cnblogs.com/GumpYan/p/7883133.html
/**
 * 用浏览器内部转换器实现html转码
 * @param {string} html 
 */
function codeHtml(html) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement ("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent !== undefined ) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}

/**
 *用浏览器内部转换器实现html解码
 * @param {string} text 
 */
function decodeHtml(text) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

/**
 * 按键选择提示
 * @param {string} key
 */
function selectOp(key) {
    var ulObj = document.getElementById('email-sug-wrapper');
    var childrenList = ulObj.children;
    var currentLi;
    // 找到当前为选中状态的Li
    for (x of childrenList) {
        if (x.getAttribute('class') === 'selected') {
            currentLi = x;
            // 清除选中状态
            currentLi.removeAttribute('class');
        }
    }
    if (currentLi === undefined) {
        childrenList[0].setAttribute('class', 'selected');
    }
    // 如果是上键
    if (key === 'ArrowUp') {
        if (currentLi.previousElementSibling !== null) {
            currentLi.previousElementSibling.setAttribute('class', 'selected');
        } else {
            childrenList[childrenList.length-1].setAttribute('class', 'selected');
        }
    }
    // 如果是下键
    if (key === 'ArrowDown') {
        if (currentLi !== childrenList[childrenList.length-1]) {
            currentLi.nextElementSibling.setAttribute('class', 'selected');
        } else {
            childrenList[0].setAttribute('class', 'selected');
        }
    }
    // 按的是回车 
    if (key === 'Enter'){
        // 解码提示
        var text = decodeHtml(currentLi.innerText);
        // 输入input
        slecteNotice(text);
        // 设置焦点
        emailInput.focus();
        // 隐藏提示
        setOff();
    }
    // 按的是esc
    if (key === 'Escape'){
        // 全选输入
        emailInput.select();
    }
}

/**
 * 清除全部按钮
 */
function clearAll() {
    clearBtn.onclick = function () {
        emailInput.value = '';
        setOff();
        clearBtn.style.display = 'none';
    }
}