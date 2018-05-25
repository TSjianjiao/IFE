/**
 * @file 表单部分
 */
 module.exports = {
    checkBoxEvent:checkBoxEvent,
    myFilter:myFilter,
    displayData:displayData,
    sortData:sortData,
    mergeData:mergeData
 }

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
            // 过滤数据
            var data = myFilter(selectedProduct, selectedRegion);
            // 给数据排序
            // 让相同的单元挨在一起，方便合并
            data = sortData(data, 'product');
            // 显示数据
            displayData(data);
            // 合并单元
            mergeData();
        }
    });
}

/**
 * 过滤器
 * @param {array} product 
 * @param {arry} region 
 */
function myFilter(product, region) {
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
    for (x in myFilter) {
        // 过滤数据
        data.push(sourceData.filter(function (item){
            return item.product === myFilter[x].product && myFilter[x].region === item.region
        }));
    } 
    return data
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
    headTr.innerHTML = '<td>商品</td><td>地区</td>';
    for (var i = 1; i < 13; i++) {
        var tdObj = document.createElement('td');
        tdObj.innerHTML = `${i}月`;
        headTr.appendChild(tdObj);
    }
    tableObj.appendChild(headTr);
    // 主体数据
    for (x of data) {
        var trObj = document.createElement('tr');
        trObj.innerHTML = `<td>${x.product}</td><td>${x.region}</td>`;
        // 月份数据
        for (var i = 0; i < 12; i++) {
            var tdObj = document.createElement('td');
            tdObj.innerHTML = `${x.sale[i]}`;
            trObj.appendChild(tdObj);
        }
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