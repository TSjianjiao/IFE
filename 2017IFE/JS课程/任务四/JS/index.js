var inputObj = document.getElementById("data");
var linObj = document.getElementById("lin");
var rinObj = document.getElementById("rin");
var loutObj = document.getElementById("lout");
var routObj = document.getElementById("rout");
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

// 制造方块
function creatBlock(num) {
    var div;
    div = "<div>"+ num + "</div>";
    return div
}
var blockList = [];
// 队列函数
function queue(flag) {
    if(flag === 1) {
        // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
        try {
            // 判断是不是数字，抛出异常
            if (isNaN(inputObj.value) || inputObj.value === "") {
                throw "请输入数字"
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
    }else if (flag === 3) {
        try {
            if (blockList.length === 0) {
                throw "请先输入数字";
            }
            // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
            var num = blockList.shift();
            // 去掉多余的字符
            num = num.replace("<div>", "");
            num = num.replace("</div>", "");
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
            if (blockList.length === 0) {
                throw "请先输入数字";
            }
            // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
            num = blockList.pop();
            num = num.replace("<div>", "");
            num = num.replace("</div>", "");
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