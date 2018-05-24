/**
 * @file 表单部分
 */

let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]


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
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].checked = true;
                        this.children[i].disabled = false;
                    }
                }
            }
            // 点击的是选项
            else if(checkType === 'option') {
                var unCheckedCount = 0;
                var CheckedCount = 0;
                var lastOneChecked;
                // 还有几个没有被选中
                for (var i = 0; i < this.children.length; i++) {
                    if(!this.children[i].checked) {
                        unCheckedCount++;
                    }
                    else {
                        // 保存最后一个被选中的
                        lastOneChecked = this.children[i];
                    }
                }
                CheckedCount = this.children.length - unCheckedCount;
                // 点击选择的时候
                if (e.target.checked) {
                    // 只有一个未选
                    if (unCheckedCount === 1) {
                        this.lastElementChild.checked = true; 
                    } 
                    // 不止一个被选中
                    if (CheckedCount > 1) {
                        for (var i = 0; i < this.children.length; i++) {
                            this.children[i].disabled = false;
                        }
                    }
                }
                // 取消选择的时候
                else {
                    var temp;
                    // 只有一个没被选择
                    if (unCheckedCount === 1) {
                        // 全选取消
                        this.lastElementChild.checked = false;
                    } 
                    // 还剩一个被选中了
                    if (CheckedCount === 1) {
                        lastOneChecked.disabled = true;
                    }
                }
            }
            // 把选择的项存入筛选数组
            // 遍历把选择的项加入对应筛选数组
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
            var data = myFilter(selectedProduct, selectedRegion);
            data = sortData(data, 'product');
            displayData(data);
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
        output.sort(function (a,b) {
            if (a.product.charCodeAt(0) - b.product.charCodeAt(0) < 0) return -1
            else if(a.product.charCodeAt(0) - b.product.charCodeAt(0) == 0) return 0
            else return 1
        })
    }
    else if (basedOn === 'region') {
        output.sort(function (a,b) {
            if (a.region.charCodeAt(1) - b.region.charCodeAt(1) < 0) return -1
            else if(a.region.charCodeAt(1) - b.region.charCodeAt(1) == 0) return 0
            else return 1
        })  
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