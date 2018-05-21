/**
 * @file 第一步：监听用户输入
 */

//  判断是不是中文输入法标志位
var isChinese = false;
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
})
// 输入结束 传递data
emailInput.addEventListener('compositionend', function (e) {
    isChinese = false;
    setTimeout(function () {
        getInput(e.data)
    }, 0);
})
function getInput(input) {
    console.log(input)
    // 获取用户输入，生成提示框中的提示内容，将提示内容添加到email-sug-wrapper中
    // 控制email-sug-wrapper的显示/隐藏状态
}

// 使用keyup事件(任何键盘输入都响应，按住不动只响应一次)：
// 一个字母一个字母的输入---->抬起响应
// 一个字母一个字母输入，同时加上按回车键，ESC键，上下左右键---->每次按键抬起后都响应
// 按住某个字母键不动---->只在最后抬起的时候响应

// 使用keypress事件(
//                  不会响应如shift、ctrl不会实际影响文本显示的按键，按住不动响应多次)：
// 一个字母一个字母的输入---->按下响应
// 一个字母一个字母输入，同时加上按回车键，ESC键，上下左右键---->每次按键都响应
// 按住某个字母键不动---->每个字母都响应

// 使用keydown事件(
//                任何键盘输入都响应，按住不动响应多次)：
// 一个字母一个字母的输入---->按下响应
// 一个字母一个字母输入，同时加上按回车键，ESC键，上下左右键---->每次按键都响应
// 按住某个字母键不动---->每个字母都响应

// 使用oninput事件(只能响应字符按键，按住不动响应多次)：
// 一个字母一个字母的输入---->按下响应
// 一个字母一个字母输入，同时加上按回车键，ESC键，上下左右键---->除了字符键其他的都不响应
// 按住某个字母键不动---->每个字母都响应
