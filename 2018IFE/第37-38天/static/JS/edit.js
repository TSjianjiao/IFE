/**
 * @file 编辑数据
 */
var tableObj = document.getElementById('table-wrapper');
// 保存原始数据
var originData;
// 记录上一个被点击的单元格
var preClickCell;
tableObj.addEventListener('mouseover', (e)=>{
    // 只有有数据td
    if (!e.target.hasAttribute('table')
        && e.target.nodeName === 'TD'
        && !isNaN(e.target.innerText)) {
            var iconObj = document.createElement('i');
            iconObj.setAttribute('class', 'iconfont');
            iconObj.innerHTML = '&#xe6e5;'
            e.target.appendChild(iconObj);
        }
});

// mouseleave只有在离开div元素才有效
// 这里要离开td所以使用mouseout
tableObj.addEventListener('mouseout', (e)=>{
    if (!e.target.hasAttribute('table') 
        && e.target.nodeName === 'TD') {  
            var child = e.target.getElementsByClassName('iconfont')[0];
            if (child) e.target.removeChild(child);
        }
});

// 点击修改数据
tableObj.addEventListener('click', (e)=>{
    // 阻止向window冒泡，不然马上又会响应window的事件函数
    e.stopPropagation();
    // 如果之前有点击过 重置之前的单元格数据
    if(originData) {
        // 去除设置的style 输入错误时的红色边框
        preClickCell.removeAttribute('style');
        preClickCell.innerHTML = originData;
    }
    // 只有有数据td
    if (!e.target.hasAttribute('table')
        && e.target.nodeName === 'TD'
        && e.target.childElementCount) {
            // 保存这次的单元格 下次重置用
            preClickCell = e.target;
            originData = e.target.firstChild.data; //
            e.target.innerHTML = `<div id="edit">
                                    <input type="text" name="data" placeholder="新数据" id="new-data">
                                    <button type="submit" id="edit-submit">确认</button>
                                    <button type="button" id="edit-cancel">取消</button>
                                  </div>`;
            // 修改数据函数
            editOp();                  
    }
    else {
        // 如果点击数据之外的位置
        // 重置记录
        preClickCell = undefined;
        originData = undefined;
    }
});

// 点击表格外恢复默认状态
window.addEventListener('click', (e)=>{
    // 之前有被点击过
    if(preClickCell) {
        preClickCell.innerHTML = originData;
    }
});

/**
 * 修改数据函数
 */
function editOp() {
    var editDiv = document.getElementById('edit');
    var inputObj = editDiv.children[0];
    // td节点
    var tdObj =  editDiv.parentElement;
    // 点击事件
    editDiv.addEventListener('click', (e)=>{
        // 阻止向td冒泡 会影响记录的前一个td值
        e.stopPropagation();
        tdObj.removeAttribute('style');
        // 点击取消按钮
        if(e.target.id === 'edit-cancel') {
            tdObj.innerHTML = originData;  // 取消就恢复原来的数据
            preClickCell = undefined;
            originData = undefined;
        }
        // 点击确定按钮
        else if (e.target.id === 'edit-submit'){
            // 从localStorage获取要替换的数据
            var index = preClickCell.parentElement.getAttribute('num');
            var oldData = JSON.parse(localStorage.getItem(index));
            var newData = inputObj.value;

            // 获取旧数据是为了获得查询条件
            var condition = oldData._id;
            // 表单验证
            if(formValidation(newData)){
                originData = tdObj.innerHTML = newData;
                // 把整行新数据的销量更新
                var newSale = [];
                [...preClickCell.parentElement.children]
                .reverse()
                    .slice(0, 12)
                        .forEach((item)=>{newSale.unshift(item.innerText)});
                // ajax请求修改数据
                editAjax(condition, newSale);
            }
            else tdObj.setAttribute('style', 'box-shadow:0 0 2px 2px red');
        } 
    });
    // 键盘监听事件
    inputObj.addEventListener('keydown',(e)=>{
        if(e.key === 'Escape') {
            tdObj.innerHTML = originData;
            preClickCell = undefined;
            originData = undefined;
        }
        else if (e.key === 'Enter') {
            if(formValidation(inputObj.value)) {
                originData = tdObj.innerHTML = inputObj.value;
                preClickCell = undefined;
                originData = undefined;
            }
            else tdObj.setAttribute('style', 'box-shadow:0 0 2px 2px red');
        }
    });
}

/**
 * 表单验证
 * @param {string} data
 */
function formValidation(data) {
    data = Number(data)
    if (!data || data < 0) {
        alert('数据格式有误！')
        return false
    }
    else return true
}

/**
 * ajax请求修改数据
 * @param {object} condition 
 * @param {object} newdata 
 */
function editAjax(condition, newdata) {
    var xhr = new XMLHttpRequest;
    xhr.open('POST', '/edit');
    // 设置请求头
    xhr.setRequestHeader('content-Type', 'application/Json');
    var request = {condition:condition,newdata:newdata};
    // 发送内容应该为字符串格式
    xhr.send(JSON.stringify(request));
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4) {

        }
    }
}