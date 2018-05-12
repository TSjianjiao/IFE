function myGetEle(id) {
    return document.getElementById(id)
}
var result = myGetEle("result");
var op_add = myGetEle("add-btn");
var op_minus = myGetEle("minus-btn");
var op_times = myGetEle("times-btn");
var op_divide = myGetEle("divide-btn");
op_add.onclick = function add() {
    var num_a = Number(myGetEle("first-number").value);
    var num_b = Number(myGetEle("second-number").value);
    result.innerHTML = "运算结果: " + (num_a + num_b);
};
op_minus.onclick = function minus() {
    var num_a = Number(myGetEle("first-number").value); 
    var num_b = Number(myGetEle("second-number").value);
    result.innerHTML = "运算结果: " + (num_a - num_b);
};
op_times.onclick = function times() {
    var num_a = Number(myGetEle("first-number").value);
    var num_b = Number(myGetEle("second-number").value);
    result.innerHTML = "运算结果: " + (num_a * num_b);
};
op_divide.onclick = function divide() {
    var num_a = Number(myGetEle("first-number").value);
    var num_b = Number(myGetEle("second-number").value);
    result.innerHTML = "运算结果: " + (num_a / num_b);
};
