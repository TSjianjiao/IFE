/****** ？？？题目这不就已经实现功能了吗*******/
// var list = document.querySelectorAll("li");
// for (var i = i = 0, len = list.length; i < len; i++) {
//     list[i].onclick = function(e) {
//         var t = e.target;
//         var c = t.style.backgroundColor;
//         var p = document.getElementsByClassName("color-picker")[0];
//         p.innerHTML = c;
//         p.style.color = c;
//     }
// }

/************无事件代理*************** */
// var pText = document.getElementsByClassName("color-picker")[0];
// var liList = document.getElementsByTagName("li");

// // 注册获取颜色点击事件
// for (var i = 0; i < liList.length; i++) {
//     liList[i].onclick = colorPicker;
// }

// // 取色显示函数
// function colorPicker () {
//     var bgColor = this.style.backgroundColor;
//     pText.innerHTML = bgColor;
//     pText.style.color = bgColor;
// }

/************有事件代理*************** */
var pText = document.getElementsByClassName("color-picker")[0];
var ulObj = document.getElementsByClassName("palette")[0];

// 注册点击事件 代理在ul上
ulObj.onclick = function (e) {
    // 这里就不能用this了 因为this指向的是ulObj
    var target = e.target;
    colorPicker (target);
}
// 取色显示函数
function colorPicker (target) {
    var bgColor = target.style.backgroundColor;
    pText.innerHTML = bgColor;
    pText.style.color = bgColor;
}