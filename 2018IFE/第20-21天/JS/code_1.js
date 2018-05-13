var submitBtn = document.getElementById("submit-btn");
var inputText = document.getElementById("name")

// 注册点击事件
submitBtn.onclick = function () {
    var text = inputText.value;
    console.log(text);
}
//注册按键按下事件
inputText.onkeydown = function (e) {
    var text = inputText.value;
    if (e.key === "Enter") {
        console.log(text);
    }else if (e.key === "Escape") {
        // 不是innerHTML,input标签也不是闭合标签
        inputText.value = "";
    }
}