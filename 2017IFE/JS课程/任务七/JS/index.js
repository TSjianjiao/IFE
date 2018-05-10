var dlrBtn = document.getElementById("dlr");
var ldrBtn = document.getElementById("ldr");
var lrdBtn = document.getElementById("lrd");
var root = document.getElementById("root");
var colorList = [];
var timerId;
// 注册事件
dlrBtn.onclick = function () {
    colorList = [];
    // 先清空定时器
    clearInterval(timerId);
    dlr(root);
    console.log(colorList);
    timerId = setInterval(display, 500);
}
ldrBtn.onclick = function () {
    colorList = [];
    clearInterval(timerId);
    ldr(root);
    console.log(colorList);
    timerId = setInterval(display, 500);
}
lrdBtn.onclick = function () {
    colorList = [];
    clearInterval(timerId);
    lrd(root);
    console.log(colorList);
    timerId = setInterval(display, 500);
}
/**
 * 前序遍历
 * @param {HTMLElement} node 
 */
function dlr(node) {
    if (node !== null) {
        colorList.push(node);
        dlr(node.firstElementChild);
        dlr(node.lastElementChild);
    }
}
/**
 * 中序遍历
 * @param {HTMLElement} node 
 */
function ldr(node) {
    if (node !== null) {
        ldr(node.firstElementChild);
        colorList.push(node);
        ldr(node.lastElementChild);
    }
}
/**
 * 后序遍历
 * @param {HTMLElement} node 
 */
function lrd(node) {
    if (node !== null) {
        lrd(node.firstElementChild);
        lrd(node.lastElementChild);
        colorList.push(node);
    }
}
/**
 * 显示函数
 */
function display() {
    var current = colorList.shift();
    if (colorList.length === null) {
        clearInterval(timerId);
    }else {
        var divList = document.querySelectorAll("div");
        for (var i = 0; i < divList.length; i++) {
            divList[i].style.backgroundColor = "#fff";
        }
        current.style.backgroundColor = "#75dfb6";
    }
}
