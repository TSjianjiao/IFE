/**
 * @file 编码任务4
 */
    
/***********用setTimeout实现 *****************/
// var fadeObj = document.getElementById('fade-obj');
// var fadeBtn = document.getElementById('fade-btn');
// var flag = 0;
// var timerCount = 100;
// // 绑定点击事件
// fadeBtn.onclick = function () {
//     this.setAttribute('disabled', 'disabled');
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
//             fadeBtn.removeAttribute('disabled');
//             fadeBtn.innerHTML = '淡入';
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
//             fadeBtn.removeAttribute('disabled');
//             fadeBtn.innerHTML = '淡出';
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
var fadeObj = document.getElementById('fade-obj');
var fadeBtn = document.getElementById('fade-btn');
var flag = 0;
var timerCount = 100;
var timerId;

// 绑定点击事件
fadeBtn.onclick = function () {
    this.setAttribute('disabled', 'disabled');
    timerId = setInterval(fade, 10);
};

/**
 * 淡入淡出函数
 */
function fade() {
    if (!flag) {
        // 淡出部分
        timerCount--;
        if (timerCount < 0) {
            fadeBtn.removeAttribute('disabled');
            fadeBtn.innerHTML = '淡入';
            // 清除定时器
            clearInterval(timerId);
            timerCount = 0;
            flag = 1;
            return
        }
        fadeObj.style.opacity = timerCount / 100;
        console.log(timerCount);
    }
    else {
        // 淡入部分
        timerCount++;
        if (timerCount > 100) {
            fadeBtn.removeAttribute('disabled');
            fadeBtn.innerHTML = '淡出';
            clearInterval(timerId);
            timerCount = 100;
            flag = 0;
            return
        }
        fadeObj.style.opacity = timerCount/100;
        console.log(timerCount/100);
    } 
}
