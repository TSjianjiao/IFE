function myGetEle(id) {
    return document.getElementById(id)
}
var result = myGetEle("result");
var op_add = myGetEle("add-btn");
var op_minus = myGetEle("minus-btn");
var op_times = myGetEle("times-btn");
var op_divide = myGetEle("divide-btn");
op_add.onclick = function add() {
    var num_a = myGetEle("first-number").value;
    var num_b = myGetEle("second-number").value;
    try {
        if (isNaN(num_a) || isNaN(num_b) || num_a === "" || num_b === "") {
            throw "请输入数字";
        }
        result.innerHTML = "运算结果: " + (Number(num_a) + Number(num_b));
    } catch (error) {
        confirm(error);
    } 
};
    op_minus.onclick = function minus() {
    var num_a = myGetEle("first-number").value; 
    var num_b = myGetEle("second-number").value;
    try {
        if (isNaN(num_a) || isNaN(num_b) || num_a === "" || num_b === "") {
            throw "请输入数字";
        }
        result.innerHTML = "运算结果: " + (Number(num_a) - Number(num_b));
    } catch (error) {
        confirm(error);
    } 
};
op_times.onclick = function times() {
    var num_a = myGetEle("first-number").value;
    var num_b = myGetEle("second-number").value;
    try {
        if (isNaN(num_a) || isNaN(num_b) || num_a === "" || num_b === "") {
            throw "请输入数字";
        }
        result.innerHTML = "运算结果: " + (Number(num_a) * Number(num_b));
    } catch (error) {
        confirm(error);
    }
};
op_divide.onclick = function divide() {
    var num_a = myGetEle("first-number").value;
    var num_b = myGetEle("second-number").value;
    try {
        if (isNaN(num_a) || isNaN(num_b) || num_a === "" || num_b === "") {
            throw "请输入数字";
        }
        if (Number(num_b) === 0) {
            throw "除数不能为0！";
        }
        result.innerHTML = "运算结果: " + (Number(num_a) / Number(num_b));
    } catch (error) {
        confirm(error);
    }
};
