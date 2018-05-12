var testBtn = document.getElementById("test");
var inputText = document.getElementById("input");
var notice = document.getElementById("notice");
testBtn.onclick = function () {
    var text = inputText.value;
    // 记录总长
    var lengthTemp = 0;
    // 匹配汉字和汉字字符 gim模式匹配所有字符
    var regx = {0:/[^\x00-\xff]/gim, 1:/[\d]/gim, 2:/[A-z]/gim, 3:/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/gim};
    /**** 
    匹配任意一个数字/[\d]/gim
    匹配任意英文大小写字母/[A-z]/gim
    匹配英文符号/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/gim
    ****/

    // match方法返回匹配的字符数组
    for (var i = 0; i < 4; i++) {
        if (text.match(regx[i]) !== null) {
            console.log(text.match(regx[i]));
            if (i === 0 ) {
                // 中文字符占两个长度
                lengthTemp += (text.match(regx[i]).length * 2);
            }else {
                lengthTemp += text.match(regx[i]).length;
            }
            console.log("长度: "+lengthTemp);
        }
    }
    if (!lengthTemp) {
        notice.innerHTML = "姓名不能为空";
        notice.style.color = "red";
    }else if (lengthTemp > 16) {
        notice.innerHTML = "最多输入16个字符";
        notice.style.color = "red";
    }else if (lengthTemp < 4) {
        notice.innerHTML = "至少输入4个字符";
        notice.style.color = "red";
    }else {
        notice.innerHTML = "输入正确";
        notice.style.color = "green";
    }
};
