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
comfirmBtn.addEventListener('click', function () {sortFn(sortMode);});
comfirmBtn.addEventListener('click',  function() {displayPop('hidden');});
// 点击方法li，修改mode
popContent.addEventListener('click', function (e){ var targetLi = e.target;
                                                // 因为里面还有ul标签 和div
                                                if(targetLi.nodeName === "LI") {
                                                    // 获取自定义的属
                                                    sortMode = targetLi.getAttribute('method');
                                                }          
                                            });

// 假设有数据
var data = {0:{name:'张三', chinese:'25', math:'22', eglish:'67', score:'123'},
            1:{name:'李四', chinese:'90', math:'34', eglish:'32', score:'442'},
            2:{name:'王五', chinese:'15', math:'78', eglish:'25', score:'231'},
            3:{name:'赵六', chinese:'47', math:'44', eglish:'55', score:'112'}};

// 对象转数组
var dataArr = objToArr(data);
console.log(dataArr);
// 显示列表
displayData(dataArr);
/**
 * i标签事件注册函数
 */                                        
function iTagRregister() {
    // 用事件代理
    var dlContainer = document.getElementById('dl-container');
    dlContainer.addEventListener('click', function (e) {
        var target = e.target;
        // 如果点击目标是i标签
        if (target.nodeName === 'I') {
            // 先显示悬浮层
            displayPop('visable');
            // 更新判断那一竖栏被点击
            whitchCol = target.getAttribute('theme');
            if (target.getAttribute('dir') === 'down') {
                sortFn('maxTomin');
            }
            else if (target.getAttribute('dir') === 'up') {
                sortFn('minTomax');
            }
        }
    });
}                                           

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
    // console.log(dlContainer)
    if (dlContainer !== null) {
        bodyObj.removeChild(dlContainer);
    }
    // 创建一个dl-container
    var dlConObj = document.createElement('div');
    dlConObj.setAttribute('id', 'dl-container');
    bodyObj.appendChild(dlConObj);
    // 创建 dl dt 这里slice了最后一项也就是key列表
    // 这里使用的是slice代替pop，因为pop操作会改变原数组！！
    var keyList = input.slice(4, 5);
    for (x in keyList[0]) {
        // 创建dl
        var dlObj = document.createElement('dl');
        // 创建dt
        var dtObj = document.createElement('dt');
        // 这里给i标签赋予了一个自定义属性dir 来区分上下箭头
        // 增加一个theme属性区分是哪一栏点击
        dtObj.innerHTML = `${keyList[0][x]}
                            <i class="icon iconfont" dir='down' theme=${keyList[0][x]}>&#xe94b;</i>
                            <i class="icon iconfont" dir='up' theme=${keyList[0][x]}>&#xe94c;</i>`;
        dtObj.setAttribute('id', keyList[0][x]);
        dlObj.appendChild(dtObj);
        dlConObj.appendChild(dlObj);
    }
    var dtList = document.querySelectorAll('dt');
    // 创建dd
    var value = input.slice(0, 4);
    for (var i = 0; i < value.length; i++) {
        for (var k = 0; k < value[i].length; k++) {
            var ddObj = document.createElement('dd');
            ddObj.innerHTML = value[i][k];
            dtList[k].appendChild(ddObj); 
        }
    }
    // 给i标签注册事件
    iTagRregister();
}

/**
 * 排序
 * @param {string} mode
 */
function sortFn(mode) {
    // 把最后一行数据去掉
    var temp = dataArr.pop();
    // 根据点的哪一竖栏排序
    var index = {'name':0, 'chinese':1, 'math':2, 'eglish':3, 'score':4};
    index = index[whitchCol];
    // 排序是会改变原数组的
    if (mode === 'maxTomin') {
        dataArr.sort(function(a, b) {
            if(a[index] - b[index] < 0) {
                return 1
            }
            else if (a[index] - b[index] > 0) {
                return -1
            }
            else {
                return 0
            }
        }); 
    }
    else if (mode === 'minTomax') {
        dataArr.sort(function (a, b) {
            if(a[index] - b[index] < 0) {
                return -1
            }
            else if (a[index] - b[index] > 0) {
                return 1
            }
            else {
                return 0
            }
        });
    }
    dataArr.push(temp);
    // 更新显示
    displayData(dataArr);
}
