/***针对以上 HTML，分别使用 setTimeout 和 setInterval 实现以下功能：

    点击按钮时，开始改变 fade-obj 的透明度，开始一个淡出（逐渐消失）动画，直到透明度为0
    在动画过程中，按钮的状态变为不可点击
    在动画结束后，按钮状态恢复，且文字变成“淡入”
    在 按钮显示 淡入 的状态时，点击按钮，开始一个“淡入”（逐渐出现）的动画，和上面类似按钮不可点，直到透明度完全不透明
    淡入动画结束后，按钮文字变为“淡出”
    暂时不要使用 CSS animation （以后我们再学习）*************************/


/***********用setTimeout实现 *****************/
// var fadeObj = document.getElementById("fade-obj");
// var fadeBtn = document.getElementById("fade-btn");
// var flag = 0;
// var timerCount = 100;
// // 绑定点击事件
// fadeBtn.onclick = function () {
//     this.setAttribute("disabled", "disabled");
//     fade(10);
// }
// /**
//  * 淡出淡入函数
//  * @param {Number} speed (越小越快)
//  */
// function fade (speed) {
//     if (!flag) {
//         // 淡出部分
//         timerCount--;
//         if (timerCount < 0) {
//             fadeBtn.removeAttribute("disabled");
//             fadeBtn.innerHTML = "淡入";
//             timerCount = 0;
//             flag = 1;
//             return
//         }
//         fadeObj.style.opacity = timerCount/100;
//         console.log(timerCount);
//         setTimeout(fade, speed);
//     }else {
//         // 淡入部分
//         timerCount++;
//         if (timerCount > 100) {
//             fadeBtn.removeAttribute("disabled");
//             fadeBtn.innerHTML = "淡出";
//             timerCount = 100;
//             flag = 0;
//             return
//         }
//         fadeObj.style.opacity = timerCount/100;
//         console.log(timerCount/100);
//         setTimeout(fade, speed);
//     }
    
// }


/***********用setInterval实现 *****************/
var fadeObj = document.getElementById("fade-obj");
var fadeBtn = document.getElementById("fade-btn");
var flag = 0;
var timerCount = 100;
var timerId;

// 绑定点击事件
fadeBtn.onclick = function () {
    this.setAttribute("disabled", "disabled");
    timerId = setInterval(fade, 10);
}
/**
 * 淡入淡出函数
 */
function fade () {
    if (!flag) {
        // 淡出部分
        timerCount--;
        if (timerCount < 0) {
            fadeBtn.removeAttribute("disabled");
            fadeBtn.innerHTML = "淡入";
            clearInterval(timerId);//清除定时器
            timerCount = 0;
            flag = 1;
            return
        }
        fadeObj.style.opacity = timerCount/100;
        console.log(timerCount);
    }else {
        // 淡入部分
        timerCount++;
        if (timerCount > 100) {
            fadeBtn.removeAttribute("disabled");
            fadeBtn.innerHTML = "淡出";
            clearInterval(timerId);
            timerCount = 100;
            flag = 0;
            return
        }
        fadeObj.style.opacity = timerCount/100;
        console.log(timerCount/100);
    } 
}