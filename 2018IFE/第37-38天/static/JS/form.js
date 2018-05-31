/**
 * @file 表单部分
 */

// 记录选择
var selectedProduct = [];
var selectedRegion = [];
/**
 * 给checkbox容器注册事件
 * @param {HTMLElement} parentElement 
 */
function checkBoxEvent(parentElement) {
    parentElement.addEventListener('click', function (e) {
        // 是checkbox
        if (e.target.nodeName === 'INPUT') {
            var checkType = e.target.getAttribute('check-type');
            // 点击的是全选
            if (checkType === 'all') {
                // 如果全选勾上
                if (e.target.checked) {
                    // 就全选上
                    [...this.children].forEach(item => {
                        item.checked = true;
                    });
                }
                // 除了js操作全选取消，其他时候都是被选择上的
                e.target.checked = true;
            }
            // 点击的是选项
            else if(checkType === 'option') {
                // 如果点击完成的时候全是False
                if ([...this.querySelectorAll('input[check-type="option"]')].every(item => {
                    return item.checked === false;
                })) {
                    // 就保持当前的选项为真
                    e.target.checked = true;
                }
                // 如果点击完成的时候有一个没有被选中
                else if ([...this.querySelectorAll('input[check-type="option"]')].some(item => {
                    return item.checked === false;
                })) {
                    // 就把全选置为没有被选中
                    this.querySelector('input[check-type="all"]').checked = false;
                }
                else {
                    // 就把全选置为没有被选中
                    this.querySelector('input[check-type="all"]').checked = true;
                }
            }
            // 把选择的项存入筛选数组
            if (this.id === 'region-radio-wrapper') {
                selectedRegion = [];
                for (var i = 0; i < this.children.length-1; i++) {
                    if(this.children[i].checked) {
                        selectedRegion.push(this.children[i].nextSibling.data.trim());
                    }
                }
            }
            else if (this.id === 'product-radio-wrapper') {
                selectedProduct = [];
                for (var i = 0; i < this.children.length-1; i++) {
                    if(this.children[i].checked) {
                        selectedProduct.push(this.children[i].nextSibling.data.trim());
                    }
                }
            }
            formOp();
        }
    });
}

/**
 * 过滤器
 * @param {array} product 
 * @param {arry} region 
 */
async function myFilter(product, region) {
    var myFilter = [];
    for(x of region) {
        for (k of product) {
            var filterItem = {};
            filterItem['region'] = x;
            filterItem['product'] = k;
            myFilter.push(filterItem);
        }
    }

    var data = [];
    if (myFilter.length !== 0) {
        for (x of myFilter) {
            // 请求服务端 查询数据
            // 等待requestByAjax返回Promise.resolve后再下一步
            var temp = [];
            // 为什么要套两层数组呢
            // 因为我不知道为什么以前的代码使用的这种结构的
            // 所以为了兼容其他函数 只能这样了
            temp.push(await requestByAjax(x));
            data.push(temp);
        }
    }
    return new Promise ((resolve, rejects)=>{resolve(data)})
}

/**
 * ajax请求服务端
 * @param {object} request 
 */
function requestByAjax(request) {
    return new Promise ((resolve, rejects)=>{
        var xhr = new XMLHttpRequest;
        xhr.open('POST', '/data');
        // 设置请求头
        xhr.setRequestHeader('content-Type', 'application/Json');
        // 发送内容应该为字符串格式
        xhr.send(JSON.stringify(request));
        xhr.onreadystatechange = function () {
            if(this.readyState === 4) {
                // 响应内容是字符串要转化
                resolve(JSON.parse(xhr.responseText));
            }
        }
    })
}
/**
 * 显示数据
 * @param {array} data 
 */
function displayData(data) {
    var tableWrapper = document.getElementById('table-wrapper');
    tableWrapper.innerHTML = '';
    var tableObj = document.createElement('table');
    // 表头
    var headTr = document.createElement('tr');
    headTr.setAttribute('table', 'head');
    headTr.innerHTML = '<td table="head">商品</td><td table="head">地区</td>';
    for (var i = 1; i < 13; i++) {
        var tdObj = document.createElement('td');
        tdObj.innerHTML = `${i}月`;
        tdObj.setAttribute('table', 'head');
        headTr.appendChild(tdObj);
    }
    tableObj.appendChild(headTr);
    // 主体数据
    var index = 0;
    for (x of data) {
        var trObj = document.createElement('tr');
        trObj.setAttribute('num', index);
        trObj.innerHTML = `<td>${x.product}</td><td>${x.region}</td>`;
        // 月份数据
        for (var i = 0; i < 12; i++) {
            var tdObj = document.createElement('td');
            tdObj.innerHTML = `${x.sale[i]}`;
            trObj.appendChild(tdObj);
        }
    index++;
    tableObj.appendChild(trObj);
    }
    tableWrapper.appendChild(tableObj);
}

/**
 * 对数据排序
 * @param {array} data 
 * @param {string} basedOn
 */
function sortData(data, basedOn) {
    var output = [];
    for (x of data) {
        output.push(x[0]);
    }
    if (basedOn === 'product') {
        output.sort((a, b) => {
            return a.product.charCodeAt(0) - b.product.charCodeAt(0)
        });
    }
    else if (basedOn === 'region') {
        output.sort((a, b) => {
            return a.product.charCodeAt(1) - b.product.charCodeAt(1)
        });
    }
    return output
}

/**
 * 合并数据
 */
function mergeData() {
    var tableObj = document.getElementsByTagName('table')[0];
    // 只选了一个地区
    if (selectedRegion.length === 1) {
        // 先交换两列
        for (x of tableObj.rows) {
            var temp;
            temp = x.cells[0].innerHTML;
            x.cells[0].innerHTML = x.cells[1].innerHTML;
            x.cells[1].innerHTML = temp;
        }
        // 合并地区
        var rowSpan = tableObj.rows.length-1;
        tableObj.rows[1].cells[0].setAttribute('rowSpan', rowSpan);
        for (var i = 2; i <= tableObj.rows.length-1; i++) {
            var firstChild = tableObj.rows[i].firstElementChild;
            tableObj.rows[i].removeChild(firstChild);
        }
    }
    // 其他情况
    else {
        var sameTextFlag = '';
        var sameCellCount = [];
        var temp;
        // 合并商品
        for (x of tableObj.rows) {
            // 内容不相等
            if (sameTextFlag !==  x.cells[0].innerHTML) {
                // 存储相同数据的第一个
                temp = x.cells[0];
                sameTextFlag = x.cells[0].innerHTML;
                sameCellCount = 1;
            }
            // 内容相等
            else {
                x.removeChild(x.cells[0]);
                sameCellCount++;
                // 更新第一个数据的rowSpan
                temp.setAttribute('rowSpan', sameCellCount);
            }

        }
    }
}

/**
 * 异步 表单的各种操作
 */
async function formOp() {
    var data = []; 
    // 过滤数据 查询数据库
    data = await myFilter(selectedProduct, selectedRegion);
    // 给数据排序
    // 让相同的单元挨在一起，方便合并
    data = sortData(data, 'product');
    // 存储数据到本地  减少ajax请求
    data.forEach((item, index)=>{
        item = JSON.stringify(item);
        localStorage.setItem(index, item);
    });
    // 显示数据
    displayData(data);
    // 合并单元
    mergeData();
    // 刷新图表
    var lineChart = new drawLineChart();
    var barChart = new drawBarChart();
    // 设置折线图大小
    lineChart.canvasWidth = 1300;
    lineChart.axisWidth = 1300;
    lineChart.dataSpace = 85;
    // 设置颜色序列
    lineChart.dataStrokeColor = ['#3eeaf0', '#f39010', 
                                '#c6f716', '#76fc5c', 
                                '#1d8a34', '#1bdfae', 
                                '#074d86', '#5e0786', 
                                '#df1089']
    lineChart.dataFillColor =  ['#3eeaf0', '#f39010', 
                                '#c6f716', '#76fc5c', 
                                '#1d8a34', '#1bdfae', 
                                '#074d86', '#5e0786', 
                                '#df1089']
    lineChart.drawLineByCanvas(data);
    // 设置柱状图大小
    barChart.svgWidth = 1300;
    barChart.axisWidth = 1300;
    barChart.barSpace = 25;
    barChart.barWidth = 80;
    barChart.barColor  = ['#c6f716', '#76fc5c', '#074d86'];
    barChart.drawMultiBarBySvg(data);
}