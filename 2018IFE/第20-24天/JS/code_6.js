/**
 * @file 编码任务5
 */

var queueCont = document.getElementById('queue-cont');
var queueInput = document.getElementById('queue-input');
var inBtn = document.getElementById('in-btn');
var outBtn = document.getElementById('out-btn');
var fontBtn = document.getElementById('font-btn');
var emptyBtn = document.getElementById('empty-btn');
var queue = ['apple', 'pear'];

// 注册点击事件
inBtn.addEventListener('click', function() {queueOp('in');});
outBtn.addEventListener('click', function() {queueOp('out');});
fontBtn.addEventListener('click', function() {queueOp('font');});
emptyBtn.addEventListener('click', function() {queueOp('empty');});

/**
 * 队列操作函数
 * @param {string} mode 
 */
function queueOp(mode) {
    var inputText = queueInput.value;
    if(mode === 'in') {
        queue.push(inputText);
        var queueStr = queue.join('<-');
        queueCont.innerHTML = `队列内容：${queueStr}`;
    }
    else if (mode === 'out') {
        queue.shift();
        var queueStr = queue.join('<-');
        queueCont.innerHTML = `队列内容：${queueStr}`;
    }
    else if (mode === 'font') {
        if (queue.length === 0) {
            queueCont.innerHTML = '队头内容：什么也没有';
            return
        }
        var front = queue[0];
        queueCont.innerHTML = `队头内容：${front}`;
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