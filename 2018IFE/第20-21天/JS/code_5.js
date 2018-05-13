var smileObj = document.getElementById("smile");
var positionY = 480;
// 设置定时器
setInterval(smile, 100);
/**
 * 循环动画
 */
function smile () {
    smileObj.style.backgroundPositionY = "-" + positionY + "px";
    positionY > 8160? positionY = 480 : positionY += 480;
}