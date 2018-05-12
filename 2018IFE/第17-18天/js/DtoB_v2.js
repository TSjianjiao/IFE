/**第二个编码任务 */



function myGetEle(id) {
    return document.getElementById(id)
}
// 位数控制函数
function binBit (numStr) {
    var limitStr = myGetEle("bin-bit").value;
    var limit = Number(limitStr);
    var len = numStr.length;
    try {
        if (isNaN(limitStr) || !limitStr) {
            throw "请输入数字";
        }
        if (limit < 0 ||  !(limit % 1 === 0)) {
            throw "输入需为非负整数"
        }
        if (limit>=len) {
            for (var i=0; i<(limit-len); i++) {
                numStr = "0" + numStr;
            }
            return numStr;
        }else if (limit<len) {
            console.log("限制位数小于结果")
            return numStr;
        }
    } catch (error) {
        confirm(error);
    }
}
// 转换函数
function decTobin (num_str) {
    var num = Number(num_str); 
    var remain;  
    var temp = 0;
    var bit = 0;
    var bitArry = [];
    var len = 0;
    // 二进制存储在数组里
    while(num !== 0){
        remain = num % 2;
        bitArry.unshift(remain);
        num = parseInt(num / 2);
    }
    len = bitArry.length;
    // 数组转number
    for (var j = 0; j < len; j++) {
        temp = bitArry.shift();
        newLen = bitArry.length;
        // 更新长度
        for (var i = 0; i < newLen; i++) {
            temp = temp*10;
        }
        bit += temp;
    }
    // 位数控制函数
    // 不转换取不到长度
    bit = binBit(bit.toString());
    myGetEle("result").innerHTML = "运算结果：" + bit;
}
// 事件函数
function dec2bin(decNumber) {
    var inputNum_str = myGetEle("dec-number").value;
    var inputNum = Number (inputNum_str);
    try {
        if (isNaN(inputNum_str) || !inputNum_str) {
            throw "请输入数字";
        }
        if (inputNum < 0 ||  !(inputNum % 1 === 0)) {
            throw "输入需为非负整数"
        }
        // 调用转换函数
        decTobin (inputNum_str);
    } catch (error) {
        confirm(error);
    }
}
var transBtn = myGetEle("trans-btn");
var result = myGetEle("result");
// 注册事件
transBtn.onclick = dec2bin;
