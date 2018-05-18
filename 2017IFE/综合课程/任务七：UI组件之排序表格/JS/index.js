/**
 * @file 任务七代码
 */

var sortMode = 'maxTomin';
var whitchCol;
var popContent = document.getElementById('pop-content');
var comfirmBtn = document.getElementById('comfirm');
var cancelBtn =  document.getElementById('cancel');
// 取消键关闭悬浮层
cancelBtn.addEventListener('click',  function() {displayPop('hidden');});
// 按下确认键开始排序
comfirmBtn.addEventListener('click', sortFn);
comfirmBtn.addEventListener('click',  function() {displayPop('hidden');});
// 点击方法li，修改mode
popContent.addEventListener('click', function (e){ var targetLi = e.target;
                                                // 因为里面还有ul标签 和div
                                                if(targetLi.nodeName === "LI") {
                                                    // 获取自定义的属
                                                    sortMode = targetLi.getAttribute('method');
                                                }          
                                            });
/**
 * i标签事件注册函数
 */                                        
function iTagRregister() {
    // 给所有的i标签也就是上下排序按钮注册点击事件 上下不一样 偶数是从大到小 奇数是从小到大
    var iList = document.querySelectorAll('.container i');
    for (var i = 0; i < iList.length; i++) {
        iList[i].addEventListener('click',  function(e) {displayPop('visable'); 
                                                        whitchCol = e.target.parentElement.id});
        if (i % 2 === 0) {
            iList[i].addEventListener('click',  function() {sortMode = 'maxTomin';});
        }
        else {
            iList[i].addEventListener('click',  function() {sortMode = 'minTomax';});
        }
    }      
}                                           
// 假设有数据
var data = {0:{name:'张三', chinese:'25', math:'22', eglish:'67', score:'123'},
            1:{name:'李四', chinese:'90', math:'34', eglish:'32', score:'442'},
            2:{name:'王五', chinese:'15', math:'78', eglish:'25', score:'231'},
            3:{name:'赵六', chinese:'47', math:'44', eglish:'55', score:'112'}};

// 对象转数组
var dataArr = objToArr(data);
console.log(dataArr.slice());
// 动态更新列表
// displayData(dataArr);
// displayData(dataArr);
// displayData(dataArr);

/**
 * 对象转数组 方便使用
 * @param {object} obj 
 */
function objToArr(obj) {
    var result = [];
    // 先存储值
    for (x in obj) {
        var temp = [];
        var keyList = []; 
        for (k in obj[x]) {
            temp.push(obj[x][k]);
            keyList.push(k);
        }
        result.push(temp);
    }
    // 最后把键给存一下 这样数组的长度在使用的时候得注意下
    result.push(keyList);
    return result
}


/**
 * 显示输入数据
 * @param {array} input
 */
function displayData(input) {
    var bodyObj = document.getElementsByTagName('body')[0];
    var dlContainer = document.getElementById('dl-container');
    // 先清除所有表单
    console.log(dlContainer)
    if (dlContainer !== null) {
        bodyObj.removeChild(dlContainer);
    }
    // 创建一个dl-container
    var dlConObj = document.createElement('div');
    dlConObj.setAttribute('id', 'dl-container');
    bodyObj.appendChild(dlConObj);
    //创建 dl dt 这里pop了最后一项也就是key列表
    var tt = [];
    tt = input;
    var keyList = tt.pop();
    for (x in keyList) {
        // 创建dl
        var dlObj = document.createElement('dl');
        // 创建dt
        var dtObj = document.createElement('dt');
        dtObj.innerHTML = `${keyList[x]}
                            <i class="icon iconfont">&#xe94b;</i>
                            <i class="icon iconfont">&#xe94c;</i>`;
        dtObj.setAttribute('id', keyList[x]);
        dlObj.appendChild(dtObj);
        dlConObj.appendChild(dlObj);
    }
    var dtList = document.querySelectorAll('dt');
    // 创建dd
    for (var i = 0; i < input.length; i++) {
        for (var k = 0; k < input[i].length; k++) {
            var ddObj = document.createElement('dd');
            ddObj.innerHTML = input[i][k];
            dtList[k].appendChild(ddObj); 
        }
    }
    // 给i标签注册事件
    iTagRregister();
}

/******一系列比较函数**********/

/**
 * 从大到小
 * @param {*} a
 * @param {*} b
 */
function compareBymaxTomin(a, b) {
    // if ()
}
/**
 * 从小到大
 * @param {*} a
 * @param {*} b
 */
function compareByminTomax(a, b) {

}
/**
 * 同样总分按单科
 * @param {*} a
 * @param {*} b
 */
function compareBySubject(a, b) {

}
/**
 * 同样单科按总分
 * @param {*} a
 * @param {*} b
 */
function compareByScore(a, b) {

}

/**
 * 排序
 * @param {string} mode
 */
function sortFn(mode) {
    var temp = dataArr;
    // 把最后一行数据去掉
    var lastOne = temp.pop()
    if (mode === 'maxTomin') {
        temp.sort(compareBymaxTomin); 
    }
    else if (mode === 'minTomax') {
        temp.sort(compareByminTomax);
    }
    else if (mode === 'byScore'){
        temp.sort(compareByScore);
    }
    else if (mode === 'bySubject') {
        temp.sort(compareBySubject);
    }
    // 最后一行加回去 不然更新显示会出错
    temp.push(lastOne)
    // 更新显示
    displayData(temp);
}
