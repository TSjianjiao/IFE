/**
 * @file 编码任务1
 */

 
function Go() {
    console.log("Go");
}

function GoSteps(n) {
    // 如果输入类型不为number或者输入为NaN
    if (isNaN(n) || typeof(n) !== 'number') {
        // 如果输入为空，也就是undefined
        if(n === undefined || n === true) {
            Go();
            return
        }
        console.log('0次');
    }
    else {
        // 向下取整
        var steps = Math.floor(n);
        // 如果输入小于0
        if (steps <= 0) {
            steps = 0;
            console.log('0次');
            return
        }
        // 前进
        while(steps--) {
            Go();
        } 
    }
}

GoSteps(10); // Go 10次
GoSteps(1); // Go 1次
GoSteps(); // Go 1次，认为缺少参数时，默认参数为1
GoSteps(0);  // 0次
GoSteps(-1);  // 0次
GoSteps(1.4);  // Go 1次
GoSteps(1.6);  // Go 1次
GoSteps(-1);  // 0次
GoSteps(true);  // Go 1次
GoSteps(false);  // 0次
GoSteps("Test");  // 0次
GoSteps(NaN);  // 0次
GoSteps(null);  // 0次
