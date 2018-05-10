var inputObj = document.getElementById("data");
var linObj = document.getElementById("lin");
var rinObj = document.getElementById("rin");
var loutObj = document.getElementById("lout");
var routObj = document.getElementById("rout");
var sortObj = document.getElementById("sort");
var containerObj = document.getElementById("container");
// 按钮判断标志 1:lin按下 2:rlin按下 3:lout按下 4：rout按下
var flag;
// 注册事件
linObj.onclick = function () {
    flag = 1;
    queue(flag);
}
rinObj.onclick = function () {
    flag = 2;
    queue(flag);
}
loutObj.onclick = function () {
    flag = 3;
    queue(flag);
}
routObj.onclick = function () {
    flag = 4;
    queue(flag);
}
sortObj.onclick = sortList;
/**
 * 方块制造函数
 * @param {*} num 
 */
function creatBlock(num) {
    var div;
    div = "<div  style='height:" + Number(num) * 1.5 + "px;" + "'>" + num + "</div>";
    return div
}
var blockList = [];

/**
 * 队列函数
 * @param {Number} flag 
 */
function queue(flag) {
    if(flag === 1) {
        // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
        try {
            // 判断是不是数字，抛出异常
            if (isNaN(inputObj.value) || inputObj.value === "") {
                throw "请输入数字"
            }
            // 判断输入范围
            if (Number(inputObj.value)<10 || Number(inputObj.value)>100) {
                throw "输入范围10~100"
            }
            // 这里的判断位置很重要，因为后面要移除队列的逻辑问题，所以不能让
            // blockList有61个元素（不然后面先要移除第61个元素），所以放在unshift前面
            if (blockList.length == 60) {
                throw "队列最多包含60个数字";
            }
            blockList.unshift(creatBlock(inputObj.value));
            console.log(blockList);
            // 先清空内容
            containerObj.innerHTML = " ";
            for (var i = 0; i < blockList.length; i++) {
                // 。。又忘了自加了
            containerObj.innerHTML += blockList[i];
            }      
        } catch (error) {
            alert(error);
        }
        
    }else if (flag === 2) {
      // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
      try {
        // 判断是不是数字，抛出异常
        if (isNaN(inputObj.value) || inputObj.value === "") {
            throw "请输入数字";
        }else if (Number(inputObj.value)<10 || Number(inputObj.value)>100) {
            throw "输入范围10~100";
        }else if (blockList.length == 60) {
            throw "队列最多包含60个数字";
        }
        blockList.push(creatBlock(inputObj.value));
        console.log(blockList);
        // 先清空内容
        containerObj.innerHTML = " ";
        for (var i = 0; i < blockList.length; i++) {
            // 。。又忘了自加了
        containerObj.innerHTML += blockList[i];
        }      
    } catch (error) {
        alert(error);
    }
    }else if (flag === 3) {
        try {
             // 判断是不是数字，抛出异常
            if (isNaN(inputObj.value) || inputObj.value === "") {
            throw "请输入数字";
            }
            // 判断输入范围
            if (Number(inputObj.value)<10 || Number(inputObj.value)>100) {
                throw "输入范围10~100";
            }
            if (blockList.length === 0) {
                throw "请先输入数字";
            }
            // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
            var num = blockList.shift();
            // 分割字符串
            num = num.split(">");
            // 去掉多余字符串
            num = num[1].replace("</div", "");
            console.log(blockList);
            alert(num);
            // 先清空内容
            containerObj.innerHTML = " ";
            for (var i = 0; i < blockList.length; i++) {
                // 。。又忘了自加了
                containerObj.innerHTML += blockList[i];
            }
        } catch (error) {
            alert(error);
        }  
    }else if (flag === 4) {
        try {
             // 判断是不是数字，抛出异常
            if (isNaN(inputObj.value) || inputObj.value === "") {
                throw "请输入数字";
            }
            // 判断输入范围
            if (Number(inputObj.value)<10 || Number(inputObj.value)>100) {
                throw "输入范围10~100";
            }
            if (blockList.length === 0) {
                throw "请先输入数字";
            }
            // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
            num = blockList.pop();
            // 分割字符串
            num = num.split(">");
            // 去掉多余字符串
            num = num[1].replace("</div", "");
            console.log(blockList);
            alert(num);
            // 先清空内容
            containerObj.innerHTML = " ";
            for (var i = 0; i < blockList.length; i++) {
                // 。。又忘了自加了
                containerObj.innerHTML += blockList[i];
            }
        } catch (error) {
            alert(error);
        }
        
    }
}
/**
 * 排序函数
 */
function sortList() {
    var num = [];
    var temp;
    try {
        // 判断是不是数字，抛出异常
        if (isNaN(inputObj.value) || inputObj.value === "") {
            throw "请输入数字";
        }
        // 判断输入范围
        if (Number(inputObj.value)<10 || Number(inputObj.value)>100) {
            throw "输入范围10~100";
        }
        if (blockList.length === 0) {
            throw "请先输入数字";
        }
        for (var i = 0; i < blockList.length; i++) {
            temp = blockList[i];
            // 分割字符串
            temp = temp.split(">");
            // 去掉多余字符串
            temp = temp[1].replace("</div", "");
            num.push(Number(temp));
        }
        // 冒泡排序
        for(var j = 0 ; j < num.length; j++) {
            for (var k = j+1; k < num.length; k++) {
                if(num[j] > num[k]) {
                    var listTemp;
                    listTemp = num[k];
                    num[k] = num[j];
                    num[j] = listTemp;
                }
            }
        }
        // 清空数组 很重要 因为未排序的元素还在里面
        blockList = [];
        for (var g = 0; g < num.length; g++) {
            blockList.push(creatBlock(num[g]));
        }
        // 清空innerHTML
        containerObj.innerHTML = " ";
        for (var i = 0; i < blockList.length; i++) {
            containerObj.innerHTML += blockList[i];
        }    
    } catch (error) {
            alert(error);
    }
 
}
