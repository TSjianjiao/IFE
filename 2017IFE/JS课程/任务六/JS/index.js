var inputObj = document.getElementById("data");
var linObj = document.getElementById("lin");
var rinObj = document.getElementById("rin");
var loutObj = document.getElementById("lout");
var routObj = document.getElementById("rout");
var containerObj = document.getElementById("container");
var searchObj = document.getElementById("search");
var searchBtnObj = document.getElementById("searchbtn");
// 按钮判断标志 1:lin按下 2:rlin按下 3:lout按下 4：rout按下
var flag;

// 注册事件
linObj.onclick = function () {
    flag = 1;
    queue(flag);
};
rinObj.onclick = function () {
    flag = 2;
    queue(flag);
};
loutObj.onclick = function () {
    flag = 3;
    queue(flag);
};
routObj.onclick = function () {
    flag = 4;
    queue(flag);
};
searchBtnObj.onclick = search;

/**
 * 制造方块
 * @param {*} data 
 */
function creatBlock(data) {
    var div;
    div = "<div>"+ data + "</div>";
    return div
}
var blockList = [];
/**
 * 生成队列可视化
 */
function queue() {
    if(flag === 1) {
        // 构造一个字符串列表（每个方块的标签和内容），然后依次写入
        try {
            var inputList = inputObj.value.split(",");
            // 抛出异常
            if (inputObj.value === "") {
                throw "请输入内容";
            }
            for (var k = 0; k < inputList.length; k++) {
                blockList.unshift(creatBlock(inputList[k]));
            }
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
        var inputList = inputObj.value.split(",");
        //抛出异常
        if (inputObj.value === "") {
            throw "请输入内容";
        }
        for (var k = 0; k < inputList.length; k++) {
            blockList.push(creatBlock(inputList[k]));
        }
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
                throw "请先输入内容";
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
                throw "请先输入内容";
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
/**
 * 搜索函数
 */
function search() {
    var key = searchObj.value;
    // 既是定义变量也是清空数组
    var tempBlock = [];
    for (var k = 0; k < blockList.length; k++) {
        // 备份方块 不在原数列上操作 不然不方便复位
        tempBlock.push(blockList[k]);
    }
    for (var i = 0; i < tempBlock.length; i++) {
        var temp;
        // 提取输入内容
        temp = tempBlock[i].replace("<div>", "");
        temp = temp.replace("</div>", "");
        // 高亮匹配内容
        if (temp.indexOf(key) != -1) {
            tempBlock[i] = tempBlock[i].replace(key, "<span>"+ key + "</span>");
            console.log(tempBlock[i]);
        }
    }
    // 清空innnerHTML
    containerObj.innerHTML = "";
    for (var j = 0; j < tempBlock.length; j++) {
        containerObj.innerHTML += tempBlock[j];
    }
}