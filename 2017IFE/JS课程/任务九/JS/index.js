var superObj = document.getElementById("super");
var searchBtn = document.getElementById("searchBtn");
var searchText = document.getElementById("searchText");
var ergodicBtn = document.getElementById("ergodic");
var deleteBtn = document.getElementById("delete");
var addBtn = document.getElementById("add");
var addText = document.getElementById("addText");
/**************************** 
    没有实现匹配字符的单独高亮，
    主要是因为我的html结构已经定了懒得该了
    不然遍历的函数还要再改.
    bug：增加了新节点后，无法选择新的节点
    原因：选择事件注册是网页加载好后注册的，
    网页结构改变后没更新。
    解决方法：想办法动态更新，感觉可以加个定时器
    过段时间就更新。。但是效率太差了。
******************************/

// 是否有匹配
var flag; 
// 保存遍历节点结果
var ergodicList = [];
// 保存遍历内容结果
var ergodicTextList = [];
// 查询结果的列表(元素对象)
var keyList = [];
// 定时器id
var timerId;
// 保存选择的节点
var selectedNode;

/*************注册遍历事件***********/
ergodicBtn.onclick = function () {
    // 清空结果
    ergodicList = [];
    // 清空定时器
    clearInterval(timerId);
    // 先保存根节点
    ergodicList.push(superObj);
    // 遍历
    ergodic(superObj.firstElementChild);
    console.log(ergodicList);
    // 定时显示
    timerId = setInterval(display, 500);
};
/****************注册查询事件************/
searchBtn.onclick = function () {
    // 输入框数据
    var inputData = searchText.value;
    // 清空结果
    flag = false;
    ergodicList = [];
    ergodicTextList = [];
    keyList = [];
    // 先清除所有class(上次的高亮结果)
    var lightList = document.querySelectorAll("div");
    for (var i = 0; i < lightList.length; i++) {
        lightList[i].removeAttribute("class");
    }
    // 清空定时器
    clearInterval(timerId);
    // 先保存根节点
    ergodicList.push(superObj);
    ergodicTextList.push(superObj.getAttribute("id"));
    // 遍历
    searchTree(superObj.firstElementChild);
    ergodic(superObj.firstElementChild);
    // 定时显示
    timerId = setInterval(function () {
        display("search", inputData);
        }, 500);
};
/*************注册元素选择事件************/
register();
/************注册删除事件**********/
deleteBtn.onclick = deleteFn;
/***********注册添加事件*************/
addBtn.onclick = addFn;

/**
 * 遍历树的节点
 * @param {HTMLElement} nodeFristChild 
 */
function ergodic(nodeFristChild) {
    if(nodeFristChild !== null) {
        ergodicList.push(nodeFristChild);
        ergodic(nodeFristChild.nextElementSibling);
        ergodic(nodeFristChild.firstElementChild);
    }
}
/**
 * 遍历树的内容
 * @param {HTMLElement} nodeFristChild 
 */
function searchTree (nodeFristChild) {
    if(nodeFristChild !== null) {
        ergodicTextList.push(nodeFristChild.getAttribute("id"));
        searchTree(nodeFristChild.nextElementSibling);
        searchTree(nodeFristChild.firstElementChild);
    }
} 
/**
 * 遍历可视化函数
 * @param {String} mode
 * @param {String} key
 */
function display (mode = "", key = "") {
    var current;
    // 先清除所有style
    var divList = document.querySelectorAll("div");
    for (var i = 0; i < divList.length; i++) {
        divList[i].removeAttribute("style");
    }
    if (!ergodicList.length) {
        clearInterval(timerId);
        if (!flag) {
            alert("没有匹配的");
        }
    }else {
        // 前面用的push，这里就用shift。反之亦然
        current = ergodicList.shift();
        //模式选择
        if (mode === "search") {
            var currentId = current.getAttribute("id");
            if (currentId.match(key) !== null) {
                flag = true;
                current.setAttribute("class", "hightlight");
                console.log(current.getAttribute("id"));
            }
        }
        current.style.backgroundColor = "#e01515";
    }
}
/**
 * 选择元素事件注册函数
 */
function register () {
    // 清空结果
    ergodicList = [];
    // 获取节点列表
    // 先保存根节点
    ergodicList.push(superObj);
    // 遍历
    ergodic(superObj.firstElementChild);
    for (var i = 0; i < ergodicList.length; i++) {
        ergodicList[i].onclick = function (e) {
            // 存储当前节点
            selectedNode = this;
            // 先清除所有style
            var divList = document.querySelectorAll("div");
            for (var i = 0; i < divList.length; i++) {
                divList[i].removeAttribute("style");
            }
            this.style.backgroundColor = "#2cb9e4";
            // 因为嵌套关系，阻止事件冒泡
            e.stopPropagation(this);
        }
    }
}
/**
 * 删除节点函数
 */
function deleteFn () {
    // 要先找到父元素，然后删除
    var parent = selectedNode.parentNode
    // 删除这个，其下面的子元素都会不见 
    parent.removeChild(selectedNode);
}
/**
 * 添加节点函数
 */
function addFn() {
    var text = addText.value;
    var newElemnt = document.createElement("div");
    newElemnt.innerHTML = text;
    selectedNode.appendChild(newElemnt);
}