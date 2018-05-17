/**
 * @file 编码任务5
 */

var stackCont = document.getElementById('stack-cont');
var stackInput = document.getElementById('stack-input');
var pushBtn = document.getElementById('push-btn');
var popBtn = document.getElementById('pop-btn');
var fontBtn = document.getElementById('font-btn');
var emptyBtn = document.getElementById('empty-btn');
var queue = ['apple', 'pear'];

// 注册点击事件
pushBtn.addEventListener('click', function() {queueOp('push');});
popBtn.addEventListener('click', function() {queueOp('pop');});
fontBtn.addEventListener('click', function() {queueOp('font');});
emptyBtn.addEventListener('click', function() {queueOp('empty');});

/**
 * 栈操作函数
 * @param {string} mode 
 */
function queueOp(mode) {
    var inputText = stackInput.value;
    if(mode === 'push') {
        queue.push(inputText);
        var queueStr = queue.join('->');
        stackCont.innerHTML = `栈内容：${queueStr}`;
    }
    else if (mode === 'pop') {
        queue.pop();
        var queueStr = queue.join('->');
        stackCont.innerHTML = `栈内容：${queueStr}`;
    }
    else if (mode === 'font') {
        if (queue.length === 0) {
            stackCont.innerHTML = '栈顶内容：什么也没有';
            return
        }
        var front = queue[queue.length - 1];
        stackCont.innerHTML = `栈顶内容：${front}`;
    }
    else if (mode === 'empty') {
        if(queue.length === 0) {
            alert('空的！')
        }
    }
    else {
        alert('mode参数有误！')
    }
}