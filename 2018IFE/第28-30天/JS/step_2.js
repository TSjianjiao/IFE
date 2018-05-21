/**
 * @file 第二步：增加其他功能
 */

//  判断是不是中文输入法标志位
var isChinese = false;
// 邮箱后缀
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var emailInput = document.getElementById('email-input');

emailInput.addEventListener('keypress', function (e) {
    if (isChinese === false) {
        // 增加延时，等待input更新
        setTimeout(function () {
            getInput(e.target.value)
        }, 0);
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

/**
 * 获取输入
 * @param {string} input 
 */
function getInput(input) {
    // 去除前后空格
    var inputData = input.trim();
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
    // 遍历后缀数组
    for (x of postfixList) {
        noticeList.push(`${input}@${x}`)
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
    for (x of data) {
        var liObj = document.createElement('li');
        liObj.innerHTML = x;
        ulObj.appendChild(liObj);
    }
}

/**
 * 控制提示显示/隐藏
 * @param {string} input 
 */
function noticeSwitch(input) {
    var ulObj = document.getElementById('email-sug-wrapper');
    if (input === '') {
        ulObj.style.display = 'none';
    } else {
        ulObj.style.display = 'block';
    }
}